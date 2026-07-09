const Product = require('../model/Product');
const BEST_SELLER_PERCENT = 0.2;
const recomputeBestSellers = async () => {
  const products = await Product.find().select('_id salesCount isBestSeller').sort({
    salesCount: -1
  });
  if (!products.length) return;
  const topCount = Math.max(1, Math.ceil(products.length * BEST_SELLER_PERCENT));
  const threshold = products[topCount - 1].salesCount ?? 0;
  const ops = [];
  for (const p of products) {
    const sales = p.salesCount ?? 0;
    const isBestSeller = sales > 0 && sales >= threshold;
    if (isBestSeller !== p.isBestSeller) {
      ops.push({
        updateOne: {
          filter: {
            _id: p._id
          },
          update: {
            $set: {
              isBestSeller
            }
          }
        }
      });
    }
  }
  if (ops.length) await Product.bulkWrite(ops);
};
module.exports = {
  recomputeBestSellers
};
