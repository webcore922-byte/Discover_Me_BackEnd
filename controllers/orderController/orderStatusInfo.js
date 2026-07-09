const ORDER_STATUS_INFO = {
  pending: {
    title: 'تم استلام طلبك',
    accent: 'gold',
    body: order => `مرحباً <strong>${order.name}</strong>،<br><br>تم استلام طلبك بنجاح وجاري مراجعته، هنعلمك بكل تحديث في حالته أول بأول.`
  },
  preparing: {
    title: 'جاري تجهيز طلبك',
    accent: 'blue',
    body: order => `مرحباً <strong>${order.name}</strong>،<br><br>طلبك دلوقتي في مرحلة التجهيز، هيتم شحنه قريباً.`
  },
  on_the_way: {
    title: 'طلبك في الطريق إليك',
    accent: 'blue',
    body: order => `مرحباً <strong>${order.name}</strong>،<br><br>طلبك خرج للتوصيل وفي الطريق إليك الآن.`
  },
  delivered: {
    title: 'تم توصيل طلبك',
    accent: 'green',
    body: order => `مرحباً <strong>${order.name}</strong>،<br><br>تم تسليم طلبك بنجاح، نتمنى إنك عجبك ونشوفك قريب.`
  },
  cancelled: {
    title: 'تم إلغاء طلبك',
    accent: 'red',
    body: order => `مرحباً <strong>${order.name}</strong>،<br><br>للأسف تم إلغاء طلبك. لو عندك أي استفسار تواصل معنا من خلال المنصة.`
  }
};
module.exports = ORDER_STATUS_INFO;
