import React from 'react';

export const TermsContainer = ({ children }) => (
  <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '12rem 2rem 8rem', fontFamily: "'Outfit', sans-serif" }}>
    <div className="policy-card-lux" style={{ 
      background: '#fff', 
      padding: '4rem 5rem', 
      borderRadius: '30px', 
      boxShadow: '0 20px 40px rgba(0,0,0,0.03)', 
      color: '#444', 
      lineHeight: '1.8', 
      fontSize: '1.05rem',
      border: '1px solid #eee'
    }}>
      <style>{`
        .policy-card-lux h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin-bottom: 2rem; letter-spacing: -0.02em; }
        .policy-card-lux h2 { font-size: 1.5rem; font-weight: 700; color: #111; margin-top: 2.5rem; margin-bottom: 1rem; }
        .policy-card-lux p { margin-bottom: 1.2rem; }
        .policy-card-lux a { color: var(--primary); text-decoration: none; font-weight: 600; }
        @media (max-width: 768px) {
          .policy-card-lux { padding: 2rem 1.5rem; }
          .policy-card-lux h1 { font-size: 2rem; }
        }
      `}</style>
      {children}
    </div>
  </div>
);

export const RefundPolicy = () => (
  <TermsContainer>
    <div dangerouslySetInnerHTML={{ __html: `
  <div className="shopify-policy__title">
    <h1>Refund policy</h1>
  </div>

  <div className="shopify-policy__body">
    <div className="rte">
        <p><strong>30 Day Money-back Guarantee</strong><br>Herbalife guarantees the quality and freshness of its nutrition and personal care products.<br>If for any reason you are not completely satisfied with any Herbalife® product purchased<br>directly from Herbalife or a Herbalife Independent Distributor, you may return it within 30<br>days from receipt for a full refund or product exchange. Refunds may be obtained<br>by emailing us at giangiacomo@example.com</p>
<p><br><strong>The Policy</strong><br>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we<br>can’t offer you a refund or exchange.<br>To complete your return, we require a receipt or proof of purchase.<br>Please do not send your purchase back to the manufacturer.</p>
<p><br><strong>Refunds (if applicable)</strong><br>Once your return is received and inspected, we will send you an email to notify you that we<br>have received your returned item. We will also notify you of the approval or rejection of your<br>refund.<br>If you are approved, then your refund will be processed, and a credit will automatically be<br>applied to your credit card or original method of payment, within a certain amount of days.</p>
<p><br><strong>Late or missing refunds (if applicable)</strong><br>If you haven’t received a refund yet, first check your bank account again.<br>Then contact your credit card company, it may take some time before your refund is<br>officially posted. Next contact your bank. There is often some processing time before a<br>refund is posted.<br>If you’ve done all of this and you still have not received your refund yet, please contact us at<br>giangiacomo@example.com</p>
<p><br><strong>Exchanges (if applicable)</strong><br>We only replace items if they are defective or damaged. If you need to exchange it for the<br>same item, send us an email at giangiacomo@example.com and send your item to: Herbalife,  The Atrium  1 Harefield Road  Uxbridge  Middlesex UB8 1HB.</p>
<p><br><strong>Shipping</strong><br>To return your product, you should mail your product to: Herbalife,  The Atrium  1 Harefield Road  Uxbridge  Middlesex UB8 1HB.<br>You will be responsible for paying for your own shipping costs for returning your item.<br>Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will<br>be deducted from your refund.<br>Depending on where you live, the time it may take for your exchanged product to reach you,<br>may vary.<br>If you are shipping an item over £75, you should consider using a trackable shipping service<br>or purchasing shipping insurance. We don’t guarantee that we will receive your returned<br>item.</p>
    ` }} />
  </TermsContainer>
);

export const PrivacyPolicy = () => (
  <TermsContainer>
    <div dangerouslySetInnerHTML={{ __html: `
  <div className="shopify-policy__title">
    <h1>Privacy policy</h1>
  </div>

  <div className="shopify-policy__body">
    <div className="rte">
        <p><a></a> <a></a></p>
<h1>Privacy Statement</h1>
<h2>1. Use of Customer Data</h2>
<p>The personal data that you must or may provide on our website, both mandatory and voluntary data, is required to process your order or to respond to your inquiry or comment. This includes your name, address, phone number, and email address. Your contact details are used exclusively as the delivery address for your order. Your email address is only used for electronic communication between the Giangiacomo Cristanelli store and yourself. After placing an order, you will receive an order confirmation via email. Responses to your questions and/or comments will also be sent by email. Finally, your phone number is only used in case of any delays with your order. The information you provide is stored in the Giangiacomo Cristanelli store’s database. However, this is only for the purposes mentioned in this privacy statement.</p>
<h2>2. Data Storage</h2>
<p>Your personal data and order details are stored in a secure database. Periodically, this data is cleaned up and old data is removed. If you have any questions about the data we have stored, you can contact us via the contact menu on our website. You will then receive the data we have stored as soon as possible. If your customer data is still available and you wish for it to be deleted, you can request deletion via the same communication channel. Upon receipt of this request, the data will be deleted.</p>
<h2>3. Disclosure of Information to Third Parties</h2>
<p>Your personal data will not be sold, traded, or rented to third parties, governments, or organizations. This means that information about your orders will not be shared with third parties, unless we are legally required to do so. In such a case, you will be informed.</p>
<h2>4. Exception Regarding Disclosure to Third Parties</h2>
<p>Herbalife International has the contractual right to request personal customer data from independent Herbalife distributors. This only occurs in exceptional cases and occasionally. You will be informed of this on a case-by-case basis.</p>
<h2>5. Your Consent</h2>
<p>By using our website, you consent to the collection and use of your data in the manner described above.</p>
<h2>6. Changes</h2>
<p>Changes to the privacy statement will be clearly displayed on our website.</p>
<h2>7. Other</h2>
<p>If you have any questions about the privacy statement or its application, you can contact us via the contact menu on our website.</p>
<h2>Text Marketing and Notifications</h2>
<p>By signing up for SMS notifications, you agree that automated, recurring marketing messages will be sent to the phone number provided. Consent is not a condition of purchase. Reply STOP to opt out. Reply HELP for assistance. Message and data rates may apply. For more information, please refer to the privacy statement and terms of service.</p>
<h2>Text Marketing and Notifications:</h2>
<p>By entering your phone number during the checkout process and initiating a purchase, or by signing up via our sign-up form or a keyword, you agree that we may send you SMS notifications (about your order, including abandoned cart reminders) and marketing offers via SMS. Marketing SMS messages will not exceed +41763665607 per month. You acknowledge that consent is not a condition of purchase. If you wish to opt out of marketing SMS messages and notifications, reply STOP to any mobile message we send you, or use the opt-out link provided in any of our messages. You understand and agree that alternative opt-out methods, such as using different words or requests, will not be considered a reasonable method of opting out. Message and data rates may apply. For questions, send HELP to the number from which you received the messages. You can also contact us for more information. If you wish to opt out, please follow the procedure described above.</p>

    ` }} />
  </TermsContainer>
);

export const TermsOfService = () => (
  <TermsContainer>
    <div dangerouslySetInnerHTML={{ __html: `
  <div className="shopify-policy__title">
    <h1>Terms of service</h1>
  </div>

  <div className="shopify-policy__body">
    <div className="rte">
        <p><a></a> <a></a></p>
<h1>Terms and Conditions</h1>
<h2>ARTICLE 1 - VALIDITY</h2>
<p>These terms and conditions apply to the sale of all products (hereinafter referred to as "products") offered on this website (hereinafter referred to as "website"). The publisher is "Giangiacomo Cristanelli", Tel: +41763665607. Placing an order implies the full and unconditional agreement of the customer to the terms of this website, unless other terms are specified.</p>
<h2>ARTICLE 2 - PRODUCTS</h2>
<p>The products offered on this website are clinically tested to prove their effectiveness and safety. All characteristics of each product are registered by the customer. The photos published on the website do not bind the seller.</p>
<h2>ARTICLE 3 - PRICE INFORMATION</h2>
<p>Promotional offers are only valid as long as the products are available on the website. The prices displayed on this website are in Rand, including taxes, but excluding shipping or processing costs (see Article 7), and may be changed throughout the year. The products must be paid for at the price in effect at the time of the order.</p>
<h2>ARTICLE 4 - ORDER</h2>
<p>The order is placed by clicking on the "Confirm Cart" button. By confirming the order and clicking on the "Confirm Order" button, the customer declares to agree to the full sales terms. The customer's order is confirmed with an acknowledgment receipt, which includes the order details sent to the email address provided by the customer. This acknowledgment receipt specifies the exact amount and the shipping method for the order. The seller reserves the right to cancel an order from a customer if there are payment arrears or disputes regarding a previous order or for other legitimate reasons, particularly due to the unusual nature of the order.</p>
<h2>ARTICLE 5 - AVAILABILITY OF PRODUCTS</h2>
<p>The offer of products on the website is valid as long as stocks last. If a product is no longer available after the order is placed, the seller must inform the customer within 8 days and provide the expected delivery time of the product. In this case, the customer has the option to cancel the order (if the customer's payment via bank transfer was made within 15 days of the order) or modify the order by contacting the seller via email: giangiacomo@example.com.</p>
<h2>ARTICLE 6 - PAYMENT</h2>
<h3>6.1 Payment Methods</h3>
<p>The customer must pay for the order using one of the payment methods offered on the website. Payments on the website are exclusively made in Rand (or in Dollars for Paypal). Payment by credit card is fully secure.</p>
<p>Ownership of the products remains with the seller until full payment is received from the customer. The personal information you provide is necessary for managing your order and our business relationship. This information may be shared with companies that contribute to these relationships, such as companies responsible for providing services and processing orders for administration, execution, processing, and payment.</p>
<p>This information and data are also stored to comply with legal and regulatory obligations, improve our services, and personalize the information we send you. In accordance with the law of January 6, 1978, regarding personal data protection, you have the right to access and correct the data concerning you.</p>
<h3>6.2 Payment Security with Credit Card</h3>
<p>Transactions are carried out via the Mollie, Stripe, and Paypal websites, and no credit card data is stored on hlshopnow.com.</p>
<h2>ARTICLE 7 - DELIVERY</h2>
<h3>7.1 Delivery Conditions</h3>
<p>The products will be delivered to the shipping address provided during the ordering process. The customer is responsible for providing the correct order details for accurate delivery. If the customer is not present at the time of delivery, the customer must arrange for a new delivery or pick up the package at an agreed location. Delivery typically occurs 2 working days after payment for the order and within a maximum of six working days. Shipping or processing costs are borne by the customer. The delivery date may be extended by the customer or the seller by a period of seven days, after which this becomes the final delivery date, unless the seller invokes force majeure. After this period, the customer can contact the seller via email to express the intention to cancel the order, with full reimbursement within 30 days.</p>
<h3>7.2 Exchange or Refund Conditions</h3>
<p>In the event of a discrepancy between the received product and the ordered product or damage identified by the customer upon receipt of the package due to transportation conditions, the seller will exchange or refund the product. The customer must inform the seller by email and indicate whether they wish to exchange the product or receive a refund by filling out the available complaint form on the website.</p>
<p>Provided the returned product is in its original packaging and in undamaged condition, it will be exchanged or refunded within 10 days of receipt. The product will be exchanged for an identical product from stock, or, if the product is no longer available, it will be replaced with a similar product. If desired, the returned product along with the shipping costs will be refunded as soon as possible if the seller's responsibility is determined.</p>
<h2>ARTICLE 8 - RIGHT OF WITHDRAWAL</h2>
<p>The consumer has the right to cancel the order within seven days without providing a reason and without penalty, except possibly for return costs. If the consumer moves and immediately requires a service necessary for their life, they can waive this period. In that case, they can still exercise their right of withdrawal without providing a reason or paying penalties.</p>
<h2>ARTICLE 9 - WARRANTY AND LIABILITY</h2>
<p>The customer is entitled to legal warranty for hidden defects. The seller is not liable for non-performance of the contract in case of (temporary or permanent) stock shortages, product availability issues, or force majeure, including total or partial strikes in postal services, transportation, and/or communication. The seller is not liable for damages arising therefrom, such as business losses, profit loss, missed opportunities, damages, or costs.</p>
<h2>ARTICLE 10 - PRIVACY</h2>
<p>The data entered by the customer when placing an order is processed and necessary for the execution of the contract. The customer has the right to request access to and correction of the data held by the seller and the service providers engaged by them.</p>
<h2>ARTICLE 11 - CHANGES TO THE TERMS AND CONDITIONS</h2>
<p>Considering the possible further development of the website, the seller reserves the right to change these terms and conditions at any time. The new terms and conditions will be communicated to the customer via an online change and will only apply to orders placed after the change.</p>

    ` }} />
  </TermsContainer>
);

export const DoNotSell = () => (
  <TermsContainer>
    <div dangerouslySetInnerHTML={{ __html: `
      <section id="shopify-section-template--23539548815705__main" className="shopify-section section"><link href="//hlshopnow.com/cdn/shop/t/2/assets/section-main-page.css?v=848677459125201531726152209" rel="stylesheet" type="text/css" media="all" />
<style data-shopify>.section-template--23539548815705__main-padding {
    padding-top: 21px;
    padding-bottom: 21px;
  }

  @media screen and (min-width: 750px) {
    .section-template--23539548815705__main-padding {
      padding-top: 28px;
      padding-bottom: 28px;
    }
  }</style><div className="page-width page-width--narrow section-template--23539548815705__main-padding">
  <h1 className="main-page-title page-title h0 scroll-trigger animate--fade-in">
    Do not sell or share my personal information
  </h1>
  <div className="rte scroll-trigger animate--slide-in">
    <p><link href="https://cdn.shopify.com/shopifycloud/privacy-banner/data-sale-opt-out.css" type="text/css" rel="stylesheet"> <meta charset="utf-8"></p>
<p>As stated in our privacy policy, we collect your personal data from your interactions with our website, including through the use of cookies and similar technologies. This information may be shared with third parties, including advertising partners. We do this in order to present you with advertisements on other websites that better match your interests and for other reasons detailed in our privacy policy.</p>
<p>We understand that the sharing of personal data for targeted advertising based on your browsing activity may be considered a “sale,” “sharing,” or “targeted advertising” under privacy laws in certain U.S. states. Depending on your place of residence, you may therefore have the right to opt out of these activities. If you wish to exercise this right, please follow the instructions below.</p>
<p>If you visit our website after enabling the Global Privacy Control opt-out setting, depending on your place of residence, we will treat this as a request to opt out of activities that may be considered a “sale” or “sharing” of personal information or any other use that could be considered targeted advertising, for the device and browser you used to access our site.</p>
<div id="pc--optOutFormContainer" data-not-applicable="To opt out of the “sale” or “sharing” of your personal information collected through cookies and other device-based identifiers as described above, you must navigate from the" data-form-description="If you wish to opt out of any activity that may be considered a “sale,” “sharing,” or “targeted advertising,” feel free to submit your email address to us." data-email-label="E-mail" data-success="Opt-out successful" data-error="An error occurred, please resubmit your email address."></div>
<p><script defer src="https://cdn.shopify.com/shopifycloud/privacy-banner/data-sale-opt-out.js"></script> <script defer src="https://js.hcaptcha.com/1/api.js?onload=optOutOnLoad"></script></p>

  </div>
</div>


</section>
    ` }} />
  </TermsContainer>
);

export const Contact = () => (
  <TermsContainer>
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#000', letterSpacing: '-0.02em', textAlign: 'center' }}>Contact</h1>
      <p style={{ color: '#666', textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>Siamo qui per aiutarti. Compila il modulo sottostante e ti ricontatteremo il prima possibile.</p>
      
      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="contact-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Name</label>
            <input type="text" placeholder="Il tuo nome" style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Email *</label>
            <input type="email" placeholder="La tua email" required style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }} />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Phone number</label>
          <input type="tel" placeholder="Il tuo numero" style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Comment</label>
          <textarea placeholder="Come possiamo aiutarti?" rows="6" style={{ width: '100%', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', resize: 'vertical', boxSizing: 'border-box' }}></textarea>
        </div>
        
        <button type="submit" style={{ marginTop: '1rem', background: '#000', color: '#fff', padding: '1.2rem', borderRadius: '16px', border: 'none', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
          Send Message
        </button>
      </form>
    </div>
  </TermsContainer>
);
