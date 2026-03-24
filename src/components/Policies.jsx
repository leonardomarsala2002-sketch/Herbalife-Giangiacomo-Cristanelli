import React from 'react';
import { useTranslation } from 'react-i18next';

export const TermsContainer = ({ children }) => (
  <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '16rem 2rem 8rem', fontFamily: "'Outfit', sans-serif" }}>
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
        .policy-card-lux h3 { font-size: 1.2rem; font-weight: 700; color: #111; margin-top: 1.5rem; margin-bottom: 0.8rem; }
        .policy-card-lux p { margin-bottom: 1.2rem; }
        .policy-card-lux strong { color: #000; }
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

const POLICY_TEXTS = {
  it: {
    refund: {
      title: "Politica di Rimborso",
      body: `
        <div className="rte">
            <p><strong>Garanzia di rimborso di 30 giorni</strong><br>Herbalife garantisce la qualità e la freschezza dei suoi prodotti per la nutrizione e la cura della persona. Se per qualsiasi motivo non sei completamente soddisfatto di qualsiasi prodotto Herbalife® acquistato direttamente da Herbalife o da un Distributore Indipendente Herbalife, puoi restituirlo entro 30 giorni dal ricevimento per un rimborso completo o uno scambio di prodotto. I rimborsi possono essere richiesti inviandoci un'email a giangiacomo@example.com</p>
            <p><br><strong>La Politica</strong><br>La nostra politica dura 30 giorni. Se sono passati 30 giorni dal tuo acquisto, purtroppo non possiamo offrirti un rimborso o uno scambio. Per completare il tuo reso, richiediamo una ricevuta o una prova d'acquisto. Si prega di non rispedire l'acquisto al produttore.</p>
            <p><br><strong>Rimborsi (se applicabile)</strong><br>Una volta ricevuto e ispezionato il tuo reso, ti invieremo un'email per informarti che abbiamo ricevuto l'articolo restituito. Ti informeremo anche dell'approvazione o del rifiuto del tuo rimborso. Se approvato, il rimborso verrà elaborato e un credito verrà automaticamente applicato alla tua carta di credito o al metodo di pagamento originale, entro un certo numero di giorni.</p>
            <p><br><strong>Rimborsi tardivi o mancanti (se applicabile)</strong><br>Se non hai ancora ricevuto un rimborso, controlla di nuovo il tuo conto bancario. Quindi contatta la società della tua carta di credito, potrebbe volerci del tempo prima che il rimborso venga ufficialmente registrato. Successivamente contatta la tua banca. Spesso c'è un tempo di elaborazione prima che un rimborso venga registrato. Se hai fatto tutto questo e non hai ancora ricevuto il rimborso, ti preghiamo di contattarci all'indirizzo giangiacomo@example.com</p>
            <p><br><strong>Scambi (se applicabile)</strong><br>Sostituiamo gli articoli solo se sono difettosi o danneggiati. Se hai bisogno di scambiarlo con lo stesso articolo, inviaci un'email a giangiacomo@example.com e invia il tuo articolo a: Herbalife, The Atrium 1 Harefield Road Uxbridge Middlesex UB8 1HB.</p>
            <p><br><strong>Spedizione</strong><br>Per restituire il tuo prodotto, devi spedirlo a: Herbalife, The Atrium 1 Harefield Road Uxbridge Middlesex UB8 1HB. Sarai responsabile del pagamento delle tue spese di spedizione per la restituzione del tuo articolo. Le spese di spedizione non sono rimborsabili. Se ricevi un rimborso, il costo della spedizione di ritorno verrà detratto dal rimborso. A seconda di dove vivi, il tempo necessario affinché il prodotto sostituito ti raggiunga può variare. Se stai spedendo un articolo superiore a £75, dovresti considerare l'utilizzo di un servizio di spedizione tracciabile o l'acquisto di un'assicurazione sulla spedizione. Non garantiamo che riceveremo l'articolo restituito.</p>
        </div>`
    },
    privacy: {
      title: "Privacy Policy",
      body: `
        <div className="rte">
            <h1>Informativa sulla Privacy</h1>
            <h2>1. Utilizzo dei dati dei clienti</h2>
            <p>I dati personali forniti sul nostro sito Web, sia obbligatori che facoltativi, sono necessari per elaborare il tuo ordine o per rispondere a una tua richiesta o commento. Ciò include nome, indirizzo, numero di telefono e indirizzo email. I dati di contatto vengono utilizzati esclusivamente come indirizzo di consegna dell'ordine. L'indirizzo e-mail viene utilizzato esclusivamente per la comunicazione elettronica tra il negozio e te. Dopo aver effettuato un ordine, riceverai una conferma d'ordine via e-mail.</p>
            <h2>2. Conservazione dei dati</h2>
            <p>I tuoi dati personali e i dettagli dell'ordine sono archiviati in un database sicuro. Periodicamente, questi dati vengono ripuliti e i vecchi dati vengono rimossi.</p>
            <h2>3. Divulgazione di informazioni a terzi</h2>
            <p>I tuoi dati personali non verranno venduti, scambiati o affittati a terzi, governi o organizzazioni. Ciò significa che le informazioni sui tuoi ordini non verranno condivise con terzi, a meno che non ci venga richiesto legalmente di farlo.</p>
            <h2>4. Eccezione riguardante la divulgazione a terzi</h2>
            <p>Herbalife International ha il diritto contrattuale di richiedere dati personali dei clienti ai distributori Herbalife indipendenti. Ciò accade solo in casi eccezionali e occasionalmente.</p>
            <h2>5. Il tuo consenso</h2>
            <p>Utilizzando il nostro sito Web, acconsenti alla raccolta e all'uso dei tuoi dati nel modo sopra descritto.</p>
            <h2>6. Modifiche</h2>
            <p>Le modifiche all'informativa sulla privacy verranno chiaramente visualizzate sul nostro sito web.</p>
            <h2>Marketing tramite testo e notifiche</h2>
            <p>Iscrivendoti alle notifiche SMS, accetti che vengano inviati messaggi di marketing automatizzati e ricorrenti al numero di telefono fornito. Il consenso non è una condizione per l'acquisto.</p>
        </div>`
    },
    terms: {
      title: "Termini del Servizio",
      body: `
        <div className="rte">
            <h1>Termini e Condizioni</h1>
            <h2>ARTICOLO 1 - VALIDITÀ</h2>
            <p>Questi termini e condizioni si applicano alla vendita di tutti i prodotti offerti su questo sito web. L'editore è "Giangiacomo Cristanelli", Tel: +41763665607.</p>
            <h2>ARTICOLO 2 - PRODOTTI</h2>
            <p>I prodotti offerti su questo sito web sono clinicamente testati per dimostrarne l'efficacia e la sicurezza. Le foto pubblicate sul sito non vincolano il venditore.</p>
            <h2>ARTICOLO 3 - PREZZI</h2>
            <p>Le offerte promozionali sono valide solo finché i prodotti sono disponibili. I prezzi sono comprensivi di tasse, ma escludono le spese di spedizione. I prodotti devono essere pagati al prezzo in vigore al momento dell'ordine.</p>
            <h2>ARTICOLO 4 - ORDINE</h2>
            <p>L'ordine viene effettuato cliccando sul pulsante "Conferma carrello". Il venditore si riserva il diritto di annullare un ordine in caso di arretrati di pagamento o controversie.</p>
            <h2>ARTICOLO 5 - DISPONIBILITÀ DI PRODOTTI</h2>
            <p>L'offerta è valida fino a esaurimento scorte. Se un prodotto non è più disponibile dopo l'ordine, il venditore deve informare il cliente entro 8 giorni.</p>
            <h2>ARTICOLO 6 - PAGAMENTO</h2>
            <p>Il cliente deve pagare l'ordine utilizzando uno dei metodi di pagamento offerti sul sito. La proprietà dei prodotti rimane del venditore fino al completo pagamento.</p>
            <h2>ARTICOLO 7 - CONSEGNA</h2>
            <p>I prodotti saranno consegnati all'indirizzo di spedizione fornito. La consegna avviene solitamente 2 giorni lavorativi dopo il pagamento.</p>
            <h2>ARTICOLO 8 - DIRITTO DI RECESSO</h2>
            <p>Il consumatore ha il diritto di annullare l'ordine entro sette giorni senza fornire una motivazione e senza penali.</p>
            <h2>ARTICOLO 9 - GARANZIA E RESPONSABILITÀ</h2>
            <p>Il cliente ha diritto alla garanzia legale per i vizi occulti. Il venditore non è responsabile in caso di esaurimento scorte o forza maggiore.</p>
            <h2>ARTICOLO 10 - PRIVACY</h2>
            <p>I dati inseriti dal cliente sono necessari per l'esecuzione del contratto. Il cliente ha il diritto di richiedere l'accesso e la correzione dei propri dati.</p>
        </div>`
    }
  },
  en: {
    refund: {
      title: "Refund Policy",
      body: `
        <div className="rte">
            <p><strong>30 Day Money-back Guarantee</strong><br>Herbalife guarantees the quality and freshness of its nutrition and personal care products. If for any reason you are not completely satisfied with any Herbalife® product purchased directly from Herbalife or a Herbalife Independent Distributor, you may return it within 30 days from receipt for a full refund or product exchange. Refunds may be obtained by emailing us at giangiacomo@example.com</p>
            <p><br><strong>The Policy</strong><br>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To complete your return, we require a receipt or proof of purchase. Please do not send your purchase back to the manufacturer.</p>
            <p><br><strong>Refunds (if applicable)</strong><br>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
            <p><br><strong>Late or missing refunds (if applicable)</strong><br>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at giangiacomo@example.com</p>
            <p><br><strong>Exchanges (if applicable)</strong><br>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at giangiacomo@example.com and send your item to: Herbalife, The Atrium 1 Harefield Road Uxbridge Middlesex UB8 1HB.</p>
            <p><br><strong>Shipping</strong><br>To return your product, you should mail your product to: Herbalife, The Atrium 1 Harefield Road Uxbridge Middlesex UB8 1HB. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. Depending on where you live, the time it may take for your exchanged product to reach you, may vary. If you are shipping an item over £75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
        </div>`
    },
    privacy: {
      title: "Privacy Policy",
      body: `
        <div className="rte">
            <h1>Privacy Statement</h1>
            <h2>1. Use of Customer Data</h2>
            <p>The personal data that you must or may provide on our website is required to process your order. This includes your name, address, phone number, and email address. Your contact details are used exclusively as the delivery address for your order.</p>
            <h2>2. Data Storage</h2>
            <p>Your personal data and order details are stored in a secure database. Periodically, this data is cleaned up and old data is removed.</p>
            <h2>3. Disclosure of Information to Third Parties</h2>
            <p>Your personal data will not be sold, traded, or rented to third parties, governments, or organizations.</p>
            <h2>4. Exception Regarding Disclosure to Third Parties</h2>
            <p>Herbalife International has the contractual right to request personal customer data from independent Herbalife distributors.</p>
            <h2>5. Your Consent</h2>
            <p>By using our website, you consent to the collection and use of your data in the manner described above.</p>
            <h2>6. Changes</h2>
            <p>Changes to the privacy statement will be clearly displayed on our website.</p>
            <h2>Text Marketing and Notifications</h2>
            <p>By signing up for SMS notifications, you agree that automated, recurring marketing messages will be sent to the phone number provided.</p>
        </div>`
    },
    terms: {
      title: "Terms and Conditions",
      body: `
        <div className="rte">
            <h1>Terms of Service</h1>
            <h2>ARTICLE 1 - VALIDITY</h2>
            <p>These terms and conditions apply to the sale of all products offered on this website. The publisher is "Giangiacomo Cristanelli", Tel: +41763665607.</p>
            <h2>ARTICLE 2 - PRODUCTS</h2>
            <p>The products offered on this website are clinically tested to prove their effectiveness and safety. Photos do not bind the seller.</p>
            <h2>ARTICLE 3 - PRICE INFORMATION</h2>
            <p>Promotional offers are only valid as long as products are available. Prices are inclusive of taxes, excluding shipping costs.</p>
            <h2>ARTICLE 4 - ORDER</h2>
            <p>The order is placed by clicking on the "Confirm Cart" button. The seller reserves the right to cancel an order due to payment arrears.</p>
            <h2>ARTICLE 5 - AVAILABILITY OF PRODUCTS</h2>
            <p>The offer is valid while stocks last. If a product is no longer available, the seller must inform the customer within 8 days.</p>
            <h2>ARTICLE 6 - PAYMENT</h2>
            <p>The customer must pay for the order using one of the payment methods offered. Ownership remains with the seller until full payment.</p>
            <h2>ARTICLE 7 - DELIVERY</h2>
            <p>Products will be delivered to the shipping address provided. Delivery typically happens 2 working days after payment.</p>
            <h2>ARTICLE 8 - RIGHT OF WITHDRAWAL</h2>
            <p>The consumer has the right to cancel the order within seven days without providing a reason.</p>
            <h2>ARTICLE 9 - WARRANTY AND LIABILITY</h2>
            <p>The customer is entitled to legal warranty for hidden defects. The seller is not liable for stock shortages or force majeure.</p>
            <h2>ARTICLE 10 - PRIVACY</h2>
            <p>Data entered is processed for contract execution. The customer has the right to access and correct their data.</p>
        </div>`
    }
  },
  fr: {
    refund: {
      title: "Politique de Remboursement",
      body: `
        <div className="rte">
            <p><strong>Garantie de remboursement de 30 jours</strong><br>Herbalife garantit la qualité et la fraîcheur de ses produits de nutrition et de soins personnels. Si, pour une raison quelconque, vous n'êtes pas entièrement satisfait d'un produit Herbalife® acheté directement auprès d'Herbalife ou d'un distributeur indépendant Herbalife, vous pouvez le retourner dans les 30 jours suivant sa réception pour un remboursement complet ou un échange de produit. Vous pouvez obtenir un remboursement en nous envoyant un e-mail à giangiacomo@example.com</p>
            <p><br><strong>La Politique</strong><br>Notre politique dure 30 jours. Si 30 jours se sont écoulés depuis votre achat, nous ne pouvons malheureusement pas vous proposer de remboursement ou d'échange. Pour effectuer votre retour, nous exigeons un reçu ou une preuve d'achat. Veuillez ne pas renvoyer votre achat au fabricant.</p>
            <p><br><strong>Remboursements (le cas échéant)</strong><br>Une fois votre retour reçu et inspecté, nous vous enverrons un e-mail pour vous informer que nous avons reçu votre article retourné. Nous vous informerons également de l'approbation ou du rejet de votre remboursement. Si vous êtes approuvé, votre remboursement sera traité et un crédit sera automatiquement appliqué à votre carte de crédit ou à votre mode de paiement d'origine, dans un certain nombre de jours.</p>
        </div>`
    },
    privacy: {
      title: "Politique de Confidentialité",
      body: `
        <div className="rte">
            <h1>Déclaration de Confidentialité</h1>
            <h2>1. Utilisation des données client</h2>
            <p>Les données personnelles que vous devez ou pouvez fournir sur notre site Web sont nécessaires au traitement de votre commande ou pour répondre à votre demande. Cela inclut votre nom, votre adresse, votre numéro de téléphone et votre adresse e-mail.</p>
            <h2>2. Conservation des données</h2>
            <p>Vos données personnelles et les détails de votre commande sont stockés dans une base de données sécurisée. Périodiquement, ces données sont nettoyées.</p>
            <h2>3. Divulgation d'informations à des tiers</h2>
            <p>Vos données personnelles ne seront pas vendues, échangées ou louées à des tiers, gouvernements ou organisations.</p>
        </div>`
    },
    terms: {
      title: "Conditions d'Utilisation",
      body: `
        <div className="rte">
            <h1>Termes et Conditions</h1>
            <h2>ARTICLE 1 - VALIDITÉ</h2>
            <p>Ces conditions s'appliquent à la vente de tous les produits proposés sur ce site web. L'éditeur est "Giangiacomo Cristanelli", Tél : +41763665607.</p>
            <h2>ARTICLE 2 - PRODUITS</h2>
            <p>Les produits proposés sur ce site sont testés cliniquement. Les photos ne lient pas le vendeur.</p>
            <h2>ARTICLE 3 - INFORMATIONS SUR LES PRIX</h2>
            <p>Les offres promotionnelles sont valables tant que les produits sont disponibles. Les prix incluent les taxes mais excluent les frais d'expédition.</p>
            <h2>ARTICLE 4 - COMMANDE</h2>
            <p>La commande est passée en cliquant sur le bouton "Confirmer le panier". Le vendeur se réserve le droit d'annuler une commande en cas d'arriérés de paiement.</p>
        </div>`
    }
  },
  es: {
    refund: {
      title: "Política de Reembolso",
      body: `
        <div className="rte">
            <p><strong>Garantía de devolución de dinero de 30 días</strong><br>Herbalife garantiza la calidad y frescura de sus productos de nutrición y cuidado personal. Si por alguna razón no está completamente satisfecho con cualquier producto Herbalife® comprado directamente a Herbalife o a un Distribuidor Independiente de Herbalife, puede devolverlo dentro de los 30 días posteriores a su recepción para obtener un reembolso completo o un cambio de producto. Los reembolsos se pueden obtener enviándonos un correo electrónico a giangiacomo@example.com</p>
            <p><br><strong>La Política</strong><br>Nuestra política dura 30 días. Si han pasado 30 días desde su compra, lamentablemente no podemos ofrecerle un reembolso o cambio. Para completar su devolución, requerimos un recibo o comprobante de compra. No devuelva su compra al fabricante.</p>
            <p><br><strong>Reembolsos (si corresponde)</strong><br>Una vez que se reciba e inspeccione su devolución, le enviaremos un correo electrónico para notificarle que hemos recibido su artículo devuelto. También le notificaremos la aprobación o el rechazo de su reembolso. Si se aprueba, se procesará su reembolso y se aplicará automáticamente un crédito a su tarjeta de crédito o método de pago original.</p>
        </div>`
    },
    privacy: {
      title: "Política de Privacidad",
      body: `
        <div className="rte">
            <h1>Declaración de Privacidad</h1>
            <h2>1. Uso de datos del cliente</h2>
            <p>Los datos personales que proporcione en nuestro sitio web son necesarios para procesar su pedido. Esto incluye su nombre, dirección, número de teléfono y dirección de correo electrónico.</p>
            <h2>2. Almacenamiento de datos</h2>
            <p>Sus datos personales y detalles del pedido se almacenan en una base de datos segura. Periódicamente, estos datos se limpian.</p>
            <h2>3. Divulgación de información a terceros</h2>
            <p>Sus datos personales no serán vendidos, intercambiados ni alquilados a terceros, gobiernos u organizaciones.</p>
        </div>`
    },
    terms: {
      title: "Términos del Servicio",
      body: `
        <div className="rte">
            <h1>Términos y Condiciones</h1>
            <h2>ARTÍCULO 1 - VALIDEZ</h2>
            <p>Estos términos y condiciones se aplican a la venta de todos los productos ofrecidos en este sitio web. El editor es "Giangiacomo Cristanelli", Tel: +41763665607.</p>
            <h2>ARTÍCULO 2 - PRODUCTOS</h2>
            <p>Los productos ofrecidos en este sitio han sido probados clínicamente. Las fotos no vinculan al vendedor.</p>
            <h2>ARTÍCULO 3 - PRECIOS</h2>
            <p>Las ofertas promocionales son válidas mientras haya stock. Los precios incluyen impuestos pero excluyen gastos de envío.</p>
            <h2>ARTÍCULO 4 - PEDIDO</h2>
            <p>El pedido se realiza haciendo clic en el botón "Confirmar Carrito". El vendedor se reserva el derecho de cancelar un pedido por impago.</p>
        </div>`
    }
  }
};

export const RefundPolicy = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const content = POLICY_TEXTS[lang]?.refund || POLICY_TEXTS['en'].refund;
  return (
    <TermsContainer>
      <div className="shopify-policy__title"><h1>{content.title}</h1></div>
      <div className="shopify-policy__body"><div dangerouslySetInnerHTML={{ __html: content.body }} /></div>
    </TermsContainer>
  );
};

export const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const content = POLICY_TEXTS[lang]?.privacy || POLICY_TEXTS['en'].privacy;
  return (
    <TermsContainer>
      <div className="shopify-policy__title"><h1>{content.title}</h1></div>
      <div className="shopify-policy__body"><div dangerouslySetInnerHTML={{ __html: content.body }} /></div>
    </TermsContainer>
  );
};

export const TermsOfService = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const content = POLICY_TEXTS[lang]?.terms || POLICY_TEXTS['en'].terms;
  return (
    <TermsContainer>
      <div className="shopify-policy__title"><h1>{content.title}</h1></div>
      <div className="shopify-policy__body"><div dangerouslySetInnerHTML={{ __html: content.body }} /></div>
    </TermsContainer>
  );
};

export const DoNotSell = () => {
  const { t } = useTranslation();
  return (
    <TermsContainer>
      <h1>{t('policy_nosell')}</h1>
      <p>Content for Do Not Sell My Data...</p>
    </TermsContainer>
  );
};

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <TermsContainer>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: '#000', letterSpacing: '-0.02em', textAlign: 'center' }}>{t('policy_contact')}</h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>Siamo qui per aiutarti. Compila il modulo sottostante.</p>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="contact-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Name</label>
              <input type="text" placeholder="Name" style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 250px' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 700, fontSize: '0.9rem', color: '#111' }}>Email *</label>
              <input type="email" placeholder="Email" required style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #e5e5e5', background: '#f8f8f8', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: '1rem', background: '#000', color: '#fff', padding: '1.2rem', borderRadius: '16px', border: 'none', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            Send message
          </button>
        </form>
      </div>
    </TermsContainer>
  );
};
