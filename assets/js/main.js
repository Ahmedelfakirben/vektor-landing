/* ==========================================================================
   VEKTOR LANDING & PRODUCTS INTERACTION LOGIC
   ========================================================================== */

import { getActiveLanguage, setLanguage, SUPPORTED_LANGUAGES } from './i18n.js';
import { initGsapAnimations } from './animations.js';

// 1. PRODUCT PREVIEW DATA (Interactive Switcher)
const PRODUCTS_DATA = {
  gastro: {
    name: 'Vektor Gastro',
    tag: 'Hostelería, Cafeterías y Restaurantes',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.25)',
    url: '/gastro.html',
    demoUrl: 'https://gastro.vektorlabs.ma',
    headline: 'Control total de comandas, mesas y cocina en tiempo real.',
    description: 'Olvídate de platos olvidados y cajas descuadradas. Con Vektor Gastro tus camareros cobran en mesa desde el móvil, los pedidos van directos a cocina y tú ves el beneficio neto al minuto.',
    badges: ['Plano de Mesas Interactivo', 'Pantalla KDS Cocina', 'Escandallo y Recetas', 'Arqueo Rápido'],
    stats: [
      { label: 'Tiempo de servicio', val: '-40%' },
      { label: 'Mesas gestionadas', val: 'Ilimitadas' },
      { label: 'Cuadre de caja', val: '100% Preciso' }
    ],
    mockupSnippet: `
      <div style="display: grid; grid-template-columns: 240px 1fr; gap: 20px; height: 100%; color: #fff;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px;">
          <div style="font-weight: 700; color: #F59E0B; margin-bottom: 12px; font-size: 0.85rem;">SALONES & TERRAZAS</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="padding: 10px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; font-size: 0.85rem; font-weight: 600;">Salón Principal (8 Mesas)</div>
            <div style="padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px; font-size: 0.85rem; color: #94A3B8;">Terraza Exterior (12 Mesas)</div>
            <div style="padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px; font-size: 0.85rem; color: #94A3B8;">Barra / Takeaway</div>
          </div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="font-size: 1.1rem; font-weight: 700;">Estado de Mesas en Vivo</div>
            <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); color: #10B981; padding: 4px 10px; border-radius: 99px; font-weight: 600;">Cocina en Sincronía</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; padding: 14px; text-align: center;">
              <div style="font-weight: 700;">Mesa 1</div>
              <div style="font-size: 0.75rem; color: #10B981; margin: 4px 0;">Libre</div>
              <div style="font-size: 0.75rem; color: #64748B;">4 Comensales</div>
            </div>
            <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 10px; padding: 14px; text-align: center;">
              <div style="font-weight: 700;">Mesa 2</div>
              <div style="font-size: 0.75rem; color: #F59E0B; margin: 4px 0;">Ocupada (38.50 €)</div>
              <div style="font-size: 0.75rem; color: #FBBF24;">3 Platos en marcha</div>
            </div>
            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 10px; padding: 14px; text-align: center;">
              <div style="font-weight: 700;">Mesa 3</div>
              <div style="font-size: 0.75rem; color: #60A5FA; margin: 4px 0;">Pidiendo Cuenta</div>
              <div style="font-size: 0.75rem; color: #94A3B8;">Tarjeta / Efectivo</div>
            </div>
          </div>
          <div style="margin-top: 20px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 10px; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 0.85rem; font-weight: 600;">Total Facturado Hoy en Salón</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #F59E0B;">1,248.50 €</div>
            </div>
            <a href="https://gastro.vektorlabs.ma" target="_blank" class="btn btn-sm btn-outline">Abrir Gastro Demo ↗</a>
          </div>
        </div>
      </div>
    `
  },
  fashion: {
    name: 'Vektor Fashion',
    tag: 'Tiendas de Ropa, Calzado & Boutiques',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.25)',
    url: '/fashion.html',
    demoUrl: 'https://fashion.vektorlabs.ma',
    headline: 'Matriz perfecta de tallas, colores y stock multitienda.',
    description: 'Gestiona miles de variantes en 1 clic. Escanea códigos de barras al instante, realiza inventarios rápidos y aplica rebajas de temporada sin desajustes.',
    badges: ['Matriz Tallas (XS-XXL) y Colores', 'Códigos de Barras por Talla', 'Inventario por Sucursal', 'Promociones & Rebajas'],
    stats: [
      { label: 'Variantes por artículo', val: 'Ilimitadas' },
      { label: 'Velocidad de cobro', val: '2 Segundos' },
      { label: 'Control de mermas', val: '-95%' }
    ],
    mockupSnippet: `
      <div style="display: grid; grid-template-columns: 1fr 280px; gap: 20px; height: 100%; color: #fff;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="font-weight: 700; font-size: 1.05rem;">Catálogo & Matriz de Tallas</div>
            <span style="font-size: 0.75rem; background: rgba(168, 85, 247, 0.15); color: #A855F7; padding: 4px 10px; border-radius: 99px; font-weight: 600;">Colección Primavera 2026</span>
          </div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">Chaqueta Cuero Slim Fit</div>
                <div style="font-size: 0.78rem; color: #94A3B8;">SKU: CHQ-2026-BLK | Categoría: Abrigos</div>
              </div>
              <div style="font-weight: 800; font-size: 1.15rem; color: #A855F7;">89.00 €</div>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <span style="padding: 6px 12px; background: rgba(168, 85, 247, 0.2); border: 1px solid #A855F7; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">Talla S (4 en stock)</span>
              <span style="padding: 6px 12px; background: rgba(255,255,255,0.05); border-radius: 6px; font-size: 0.8rem;">Talla M (12 en stock)</span>
              <span style="padding: 6px 12px; background: rgba(255,255,255,0.05); border-radius: 6px; font-size: 0.8rem;">Talla L (8 en stock)</span>
              <span style="padding: 6px 12px; background: rgba(239, 68, 68, 0.1); color: #EF4444; border-radius: 6px; font-size: 0.8rem;">Talla XL (Agotado)</span>
            </div>
          </div>
          <div style="background: rgba(255,255,255,0.02); border-radius: 10px; padding: 12px; font-size: 0.85rem; color: #94A3B8;">
            ✓ Lector de código de barras USB y Bluetooth conectado y listo
          </div>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 0.9rem;">Ticket de Venta Actual</div>
            <div style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 6px;">1x Chaqueta Slim Fit (M) - 89.00 €</div>
            <div style="font-size: 0.82rem; color: #94A3B8;">2x Camiseta Algodón (L) - 38.00 €</div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;"></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;">
              <span>Total:</span>
              <span style="color: #A855F7; font-size: 1.2rem;">127.00 €</span>
            </div>
          </div>
          <a href="https://fashion.vektorlabs.ma" target="_blank" class="btn btn-sm btn-gradient" style="background: linear-gradient(135deg, #A855F7, #EC4899); width: 100%;">Abrir Fashion Demo ↗</a>
        </div>
      </div>
    `
  },
  pos: {
    name: 'Vektor POS',
    tag: 'Comercio, Retail & Supermercados',
    color: '#06B6D4',
    glow: 'rgba(6, 182, 212, 0.25)',
    url: '/pos.html',
    demoUrl: 'https://pos.vektorlabs.ma',
    headline: 'Punto de venta ultrarrápido con arqueo ciego y modo offline.',
    description: 'Diseñado para que las colas no se acumulen. Cobra en segundos en efectivo, tarjeta o Bizum. Compatible con cajón portamonedas e impresoras de tickets térmicos.',
    badges: ['Arqueo Ciego de Caja', 'Compatible Escáner & Balanza', 'Cobro en 2 Clics', 'Modo Sin Conexión'],
    stats: [
      { label: 'Tiempo por ticket', val: '< 3 Seg.' },
      { label: 'Descuadre de caja', val: '0.00 €' },
      { label: 'Compatibilidad', val: '100% Hardware' }
    ],
    mockupSnippet: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%; color: #fff;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
          <div style="font-weight: 700; color: #06B6D4; font-size: 0.9rem; margin-bottom: 12px;">SESIÓN DE CAJA EN CURSO</div>
          <div style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 14px;">842.30 €</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94A3B8;">Efectivo en cajón:</span>
              <span style="font-weight: 600;">520.00 €</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94A3B8;">Tarjeta / Datáfono:</span>
              <span style="font-weight: 600;">322.30 €</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #94A3B8;">Tickets emitidos:</span>
              <span style="font-weight: 600;">47 tickets</span>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="background: rgba(6, 182, 212, 0.08); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 12px; padding: 20px;">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px;">Arqueo Ciego Automático</div>
            <p style="font-size: 0.82rem; color: #94A3B8;">El cajero ingresa lo que cuenta sin ver el total del sistema. Si hay diferencias, se registran inmediatamente en el reporte del administrador.</p>
          </div>
          <a href="https://pos.vektorlabs.ma" target="_blank" class="btn btn-sm btn-outline" style="border-color: #06B6D4; color: #06B6D4; width: 100%; text-align: center;">Probar Vektor POS Demo ↗</a>
        </div>
      </div>
    `
  },
  drive: {
    name: 'Vektor Drive',
    tag: 'Rent-a-Car & Gestión de Flotas',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.25)',
    url: '/drive.html',
    demoUrl: 'https://drive.vektorlabs.ma',
    headline: 'Contratos digitales de alquiler, inspección fotográfica y flota.',
    description: 'Automatiza la entrega y recogida de vehículos en 3 minutos. Registra fotos de daños previos para evitar disputas, calcula fianzas y gestiona mantenimientos e ITV.',
    badges: ['Inspección con Fotos Check-in/out', 'Contratos PDF Digitales', 'Control de Fianza y Combustible', 'Calendario de Flota'],
    stats: [
      { label: 'Tiempo de contrato', val: '3 Minutos' },
      { label: 'Disputas de daños', val: '-90%' },
      { label: 'Ocupación de flota', val: '+28%' }
    ],
    mockupSnippet: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%; color: #fff;">
        <div>
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 12px;">Flota en Tiempo Real</div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;">Renault Clio 2024</div>
                <div style="font-size: 0.75rem; color: #94A3B8;">Matrícula: 1234-LMN | Gasolina</div>
              </div>
              <span style="background: rgba(16, 185, 129, 0.15); color: #10B981; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">Disponible (45€/d)</span>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;">Dacia Duster 4x4</div>
                <div style="font-size: 0.75rem; color: #94A3B8;">Alquilado a: Karim Benjelloun</div>
              </div>
              <span style="background: rgba(59, 130, 246, 0.15); color: #60A5FA; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">Retorno: Mañana</span>
            </div>
          </div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px;">Inspección Check-in Digital</div>
            <p style="font-size: 0.82rem; color: #94A3B8; margin-bottom: 12px;">Captura las 4 fotos del coche con la cámara del teléfono y firma el contrato en pantalla sin imprimir ni un solo papel.</p>
            <div style="font-size: 0.78rem; color: #10B981; font-weight: 600;">✓ Fianza retenida automáticamente</div>
          </div>
          <a href="https://drive.vektorlabs.ma" target="_blank" class="btn btn-sm btn-outline" style="border-color: #10B981; color: #10B981; width: 100%; text-align: center;">Ver Demo de Drive ↗</a>
        </div>
      </div>
    `
  },
  business: {
    name: 'Vektor Business',
    tag: 'ERP, Facturación & Gestión Comercial',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.25)',
    url: '/business.html',
    demoUrl: 'https://business.vektorlabs.ma',
    headline: 'Facturación marroquí y europea, contabilidad y multi-almacén.',
    description: 'El ERP más completo para mayoristas, distribuidoras y empresas de servicios. Gestiona Devis, Bon de Commande, Bon de Livraison, Factures, pagos y tesorería en un único panel.',
    badges: ['Devis / BC / BL / Facture', 'Plan Contable & Asientos', 'Control de Tesorería & Caja', 'Múltiples Depósitos'],
    stats: [
      { label: 'Ciclo comercial', val: '100% Trazable' },
      { label: 'Tiempo contable', val: '-60%' },
      { label: 'Depósitos', val: 'Ilimitados' }
    ],
    mockupSnippet: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 100%; color: #fff;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #3B82F6; margin-bottom: 8px;">FLUJO COMERCIAL AUTOMATIZADO</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem;">
            <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">1. Devis (Presupuesto enviado)</div>
            <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">2. Bon de Commande validado</div>
            <div style="padding: 8px 12px; background: rgba(59, 130, 246, 0.2); border: 1px solid #3B82F6; border-radius: 6px; font-weight: 700;">3. Bon de Livraison entregado</div>
            <div style="padding: 8px 12px; background: rgba(16, 185, 129, 0.15); color: #10B981; border-radius: 6px; font-weight: 700;">4. Facture cobrada (14,200 MAD)</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 12px; padding: 20px;">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 8px;">Estado de Tesorería</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: #3B82F6; margin-bottom: 6px;">185,420 MAD</div>
            <div style="font-size: 0.78rem; color: #94A3B8;">Saldo consolidado bancos + cajas principales</div>
          </div>
          <a href="https://business.vektorlabs.ma" target="_blank" class="btn btn-sm btn-outline" style="border-color: #3B82F6; color: #3B82F6; width: 100%; text-align: center;">Abrir Business Demo ↗</a>
        </div>
      </div>
    `
  }
};

// 2. SWITCHER CONTROLLER
function initProductSwitcher() {
  const tabs = document.querySelectorAll('.product-tab-btn');
  const frame = document.querySelector('.mockup-display-frame');
  const headlineEl = document.getElementById('switchHeadline');
  const descEl = document.getElementById('switchDesc');
  const badgesEl = document.getElementById('switchBadges');
  const statsEl = document.getElementById('switchStats');
  const mockupEl = document.getElementById('switchMockup');
  const ctaBtn = document.getElementById('switchCtaBtn');

  if (!tabs.length || !frame) return;

  function setProduct(productKey) {
    const data = PRODUCTS_DATA[productKey];
    if (!data) return;

    // Update active tab button
    tabs.forEach(tab => {
      if (tab.dataset.product === productKey) {
        tab.classList.add('active');
        tab.style.borderColor = data.color;
      } else {
        tab.classList.remove('active');
        tab.style.borderColor = 'transparent';
      }
    });

    // Animate and update frame
    frame.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 60px ${data.glow}`;

    if (headlineEl) headlineEl.textContent = data.headline;
    if (descEl) descEl.textContent = data.description;
    if (ctaBtn) {
      ctaBtn.href = data.url;
      ctaBtn.textContent = `Ver detalles completos de ${data.name} →`;
    }

    if (badgesEl) {
      badgesEl.innerHTML = data.badges.map(b => `
        <span style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 99px; font-size: 0.82rem; font-weight: 600;">
          <span style="color: ${data.color}">✓</span> ${b}
        </span>
      `).join('');
    }

    if (statsEl) {
      statsEl.innerHTML = data.stats.map(s => `
        <div>
          <div style="font-size: 1.6rem; font-weight: 800; color: ${data.color};">${s.val}</div>
          <div style="font-size: 0.78rem; color: #94A3B8;">${s.label}</div>
        </div>
      `).join('');
    }

    if (mockupEl) {
      mockupEl.innerHTML = data.mockupSnippet;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setProduct(tab.dataset.product);
    });
  });

  // Default initial set
  setProduct('gastro');
}

// 3. ROI CALCULATOR
function initRoiCalculator() {
  const salesSlider = document.getElementById('salesSlider');
  const staffSlider = document.getElementById('staffSlider');
  const salesVal = document.getElementById('salesSliderVal');
  const staffVal = document.getElementById('staffSliderVal');
  const hoursSavedEl = document.getElementById('hoursSavedVal');
  const moneySavedEl = document.getElementById('moneySavedVal');

  if (!salesSlider || !staffSlider) return;

  function updateRoi() {
    const sales = parseInt(salesSlider.value, 10);
    const staff = parseInt(staffSlider.value, 10);

    if (salesVal) salesVal.textContent = `${sales} ventas / día`;
    if (staffVal) staffVal.textContent = `${staff} empleados`;

    // Calculations
    // Ahorro estimado de 30 segundos por venta + 45 min diarios en arqueo y compras
    const monthlyHours = Math.round((sales * 0.5 * 30 / 60) + (staff * 12));
    // Estimación de pérdidas evitadas por descuadre/mermas
    const monthlyMoney = Math.round((sales * 0.45 * 30) + (staff * 60));

    if (hoursSavedEl) hoursSavedEl.textContent = `${monthlyHours} horas`;
    if (moneySavedEl) moneySavedEl.textContent = `${monthlyMoney} € / mes`;
  }

  salesSlider.addEventListener('input', updateRoi);
  staffSlider.addEventListener('input', updateRoi);
  updateRoi();
}

// 4. PRICING TOGGLE (Monthly / Annual)
function initPricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  const prices = document.querySelectorAll('.pricing-val');
  const labelMonthly = document.getElementById('pricingLabelMonthly');
  const labelAnnual = document.getElementById('pricingLabelAnnual');
  const starterSaving = document.getElementById('starterAnnualSaving');
  const proSaving = document.getElementById('proAnnualSaving');
  const periods = document.querySelectorAll('.pricing-period');

  if (!toggle) return;

  const SAVING_TEXTS = {
    es: {
      periodMonthly: '/ mes',
      periodAnnual: '/ mes',
      starter: 'Facturado anualmente (1.728 DH/año) · Ahorras 432 DH (20%)',
      pro: 'Facturado anualmente (2.304 DH/año) · Ahorras 576 DH (20%)'
    },
    fr: {
      periodMonthly: '/ mois',
      periodAnnual: '/ mois',
      starter: 'Facturé annuellement (1 728 DH/an) · Économisez 432 DH (20%)',
      pro: 'Facturé annuellement (2 304 DH/an) · Économisez 576 DH (20%)'
    },
    en: {
      periodMonthly: '/ month',
      periodAnnual: '/ month',
      starter: 'Billed annually (1,728 DH/yr) · Save 432 DH (20%)',
      pro: 'Billed annually (2,304 DH/yr) · Save 576 DH (20%)'
    }
  };

  function updatePricingUI() {
    const isAnnual = toggle.checked;
    const lang = (localStorage.getItem('vektor_lang') || 'es').toLowerCase();
    const texts = SAVING_TEXTS[lang] || SAVING_TEXTS.es;

    // Toggle active classes on labels
    if (labelMonthly) labelMonthly.classList.toggle('active', !isAnnual);
    if (labelAnnual) labelAnnual.classList.toggle('active', isAnnual);

    // Update prices
    prices.forEach(el => {
      if (el.closest('#pricingCardEnterprise')) return;
      const monthly = el.dataset.monthly;
      const annual = el.dataset.annual;
      if (monthly && annual) {
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';
        setTimeout(() => {
          el.textContent = isAnnual ? annual : monthly;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 150);
      }
    });

    // Update periods
    periods.forEach(p => {
      if (p.closest('#pricingCardEnterprise')) return;
      p.textContent = isAnnual ? texts.periodAnnual : texts.periodMonthly;
    });

    // Update annual saving badges
    if (starterSaving) {
      if (isAnnual) {
        const textSpan = starterSaving.querySelector('.annual-saving-text') || starterSaving;
        textSpan.textContent = texts.starter;
        starterSaving.style.display = 'inline-block';
      } else {
        starterSaving.style.display = 'none';
      }
    }

    if (proSaving) {
      if (isAnnual) {
        const textSpan = proSaving.querySelector('.annual-saving-text') || proSaving;
        textSpan.textContent = texts.pro;
        proSaving.style.display = 'inline-block';
      } else {
        proSaving.style.display = 'none';
      }
    }
  }

  toggle.addEventListener('change', updatePricingUI);

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      if (toggle.checked) {
        toggle.checked = false;
        updatePricingUI();
      }
    });
  }

  if (labelAnnual) {
    labelAnnual.addEventListener('click', () => {
      if (!toggle.checked) {
        toggle.checked = true;
        updatePricingUI();
      }
    });
  }

  window.addEventListener('vektor_language_changed', () => {
    updatePricingUI();
  });

  // Initial render
  updatePricingUI();
}

// 4b. PRICING PRODUCT FILTER
const PRICING_PRODUCT_DATA = {
  all: {
    badge: null,
    color: '#7BE099',
    es: {
      starterDesc: 'Para pequeños comercios, autónomos y negocios que arrancan.',
      starterFeatures: [
        '1 Terminal TPV activo',
        'Hasta 500 productos en catálogo',
        'Arqueo de caja básico',
        'Modo Offline incluido',
        'Soporte estándar por email'
      ],
      proDesc: 'Para negocios en crecimiento que necesitan velocidad, control y productividad.',
      proFeatures: [
        '<strong>Terminales y empleados ilimitados</strong>',
        'Productos y variantes ilimitadas',
        'Control de permisos por PIN de empleado',
        'Analytics en vivo desde el móvil',
        'Soporte prioritario por WhatsApp directo'
      ],
      enterpriseDesc: 'Para marcas con varias sucursales, franquicias o redes comerciales.',
      enterpriseFeatures: [
        'Multi-sucursal con stock centralizado',
        'Traspasos de almacén entre locales',
        'Informes contables consolidados',
        'Migración de datos asistida',
        'Gestor de cuenta dedicado'
      ]
    },
    fr: {
      starterDesc: 'Pour commerces indépendants et activités débutantes avec 1 poste.',
      starterFeatures: [
        '1 Terminal de caisse actif',
        'Jusqu\'à 500 articles au catalogue',
        'Clôture de caisse standard',
        'Mode Hors-Ligne inclus',
        'Support standard par email'
      ],
      proDesc: 'Pour commerces établis, restaurants et boutiques exigeant rapidité et contrôle.',
      proFeatures: [
        '<strong>Terminaux et serveurs illimités</strong>',
        'Produits et variantes illimités',
        'Contrôle des accès par code PIN employé',
        'Indicateurs financiers en direct sur smartphone',
        'Support prioritaire direct sur WhatsApp'
      ],
      enterpriseDesc: 'Pour réseaux multi-boutiques, franchises et chaînes régionales.',
      enterpriseFeatures: [
        'Multi-boutiques avec stock centralisé',
        'Transferts d\'articles entre points de vente',
        'Exports comptables consolidés',
        'Migration assistée de vos anciennes données',
        'Responsable de compte dédié'
      ]
    },
    en: {
      starterDesc: 'For small shops and solo business operators with 1 active terminal.',
      starterFeatures: [
        '1 Active POS terminal',
        'Up to 500 catalog items',
        'Standard cash drawer count',
        'Offline Mode included',
        'Standard email support'
      ],
      proDesc: 'For established stores, restaurants, and busy boutiques requiring speed and control.',
      proFeatures: [
        '<strong>Unlimited terminals and staff logins</strong>',
        'Unlimited products and variants',
        'Strict staff PIN permission control',
        'Real-time mobile business analytics',
        'Priority direct WhatsApp hotline'
      ],
      enterpriseDesc: 'For multi-store chains, franchises, and wholesale distribution networks.',
      enterpriseFeatures: [
        'Multi-location with centralized inventory',
        'Inter-store transfer orders',
        'Consolidated financial & tax exports',
        'Assisted historical data migration',
        'Dedicated account manager'
      ]
    }
  },
  gastro: {
    badge: 'Vektor Gastro',
    color: '#F59E0B',
    es: {
      starterDesc: 'Para cafeterías, food trucks o pequeños bares con 1 punto de cobro.',
      starterFeatures: [
        '1 TPV táctil para barra o caja',
        'Carta digital y hasta 500 platos/bebidas',
        'Arqueo ciego de caja al cierre',
        'Modo Offline para no perder cobros',
        'Soporte técnico por email'
      ],
      proDesc: 'Para restaurantes y cafeterías con servicio en sala y cocina dinámica.',
      proFeatures: [
        '<strong>Comanderos móviles y tablets ilimitados</strong>',
        'Pantalla de cocina interactiva (KDS)',
        'Plano de mesas táctil y división de cuentas',
        'Gestión de suplementos, puntos de carne y notas',
        'Soporte prioritario 7/7 por WhatsApp'
      ],
      enterpriseDesc: 'Para cadenas de restaurantes, franquicias y grupos gastronómicos.',
      enterpriseFeatures: [
        'Gestión centralizada de cartas y precios',
        'Economato y compras a proveedores centralizadas',
        'Traspasos de ingredientes entre restaurantes',
        'Integración con plataformas de delivery',
        'Asesor de implantación y soporte 24/7'
      ]
    },
    fr: {
      starterDesc: 'Pour cafés, food-trucks et petits snacks avec 1 point d\'encaissement.',
      starterFeatures: [
        '1 Caisse tactile pour comptoir ou bar',
        'Carte digitale et jusqu\'à 500 plats/boissons',
        'Clôture de caisse à l\'aveugle',
        'Mode Hors-Ligne permanent',
        'Support standard par email'
      ],
      proDesc: 'Pour restaurants et brasseries avec service en salle et cuisine active.',
      proFeatures: [
        '<strong>Pads serveurs et tablettes illimités</strong>',
        'Écran cuisine interactif (KDS)',
        'Plan de salle interactif et partage d\'addition',
        'Cuissons, garnitures et commentaires cuisine',
        'Support prioritaire 7j/7 sur WhatsApp'
      ],
      enterpriseDesc: 'Pour chaînes de restauration, franchises et groupes hôteliers.',
      enterpriseFeatures: [
        'Gestion centralisée des menus et tarifs',
        'Centrale d\'achats et stocks matières premières',
        'Transferts de stocks entre restaurants',
        'Intégration agrégateurs de livraison',
        'Gestionnaire de compte dédié et astreinte'
      ]
    },
    en: {
      starterDesc: 'For coffee shops, food trucks, and small bars with 1 checkout station.',
      starterFeatures: [
        '1 Touchscreen POS terminal for bar or counter',
        'Digital menu up to 500 food & drink items',
        'Blind shift cash drawer reconciliation',
        'Offline Mode so service never stops',
        'Standard email support'
      ],
      proDesc: 'For restaurants, bistros, and high-volume dining rooms.',
      proFeatures: [
        '<strong>Unlimited server mobile handhelds & tablets</strong>',
        'Kitchen Display System (KDS)',
        'Visual floor plan & quick split checks',
        'Modifiers, meat doneness & cooking notes',
        'Priority 7/7 direct WhatsApp hotline'
      ],
      enterpriseDesc: 'For restaurant groups, multi-unit franchises, and hospitality chains.',
      enterpriseFeatures: [
        'Centralized menu engineering & pricing sync',
        'Central kitchen commissary & supplier POs',
        'Inter-unit raw ingredient transfers',
        'Online ordering & delivery aggregator hooks',
        'Dedicated onboarding engineer & 24/7 hotline'
      ]
    }
  },
  fashion: {
    badge: 'Vektor Fashion',
    color: '#A855F7',
    es: {
      starterDesc: 'Para boutiques independientes y zapaterías con 1 mostrador de venta.',
      starterFeatures: [
        '1 Puesto TPV con lector de código de barras',
        'Matriz básica de tallas y colores',
        'Tickets de venta y tickets regalo',
        'Modo Offline para seguir vendiendo',
        'Soporte técnico estándar'
      ],
      proDesc: 'Para tiendas de moda y calzado con catálogo amplio y varias dependientas.',
      proFeatures: [
        '<strong>Matriz avanzada Talla / Color / Temporada</strong>',
        'Impresión de etiquetas con código de barras',
        'Cambios, devoluciones y vales de compra',
        'Comisiones y ventas por dependiente',
        'Soporte prioritario directo por WhatsApp'
      ],
      enterpriseDesc: 'Para cadenas de tiendas de ropa, franquicias y marcas de moda.',
      enterpriseFeatures: [
        'Red multi-tienda con stock unificado en vivo',
        'Traspasos de prendas entre tiendas en 1 clic',
        'Consulta de tallas en otras tiendas del grupo',
        'Programas VIP y fidelización omnicanal',
        'Gestor de cuenta y migraciones masivas'
      ]
    },
    fr: {
      starterDesc: 'Pour boutiques de prêt-à-porter et chaussures avec 1 poste de caisse.',
      starterFeatures: [
        '1 Poste caisse avec douchette code-barres',
        'Grille simple de tailles et coloris',
        'Tickets de caisse et tickets sans prix (cadeau)',
        'Mode Hors-Ligne sécurisé',
        'Support technique par email'
      ],
      proDesc: 'Pour boutiques de mode actives avec rotation saisonnière et vendeurs.',
      proFeatures: [
        '<strong>Matrice experte Taille / Couleur / Saison</strong>',
        'Édition et impression d\'étiquettes code-barres',
        'Retours, échanges et génération d\'avoirs',
        'Suivi du chiffre par vendeur et commissions',
        'Support prioritaire direct sur WhatsApp'
      ],
      enterpriseDesc: 'Pour enseignes de mode, réseaux de boutiques et franchises.',
      enterpriseFeatures: [
        'Multi-boutiques avec stock réseau unifié',
        'Transferts de pièces inter-magasins en 1 clic',
        'Consultation de disponibilité globale par taille',
        'Programme fidélité et clients VIP omnicanal',
        'Chargé de compte dédié et imports assistés'
      ]
    },
    en: {
      starterDesc: 'For independent apparel boutiques and shoe shops with 1 counter.',
      starterFeatures: [
        '1 POS terminal with barcode scanner support',
        'Core size and color variant matrix',
        'Receipt printing and gift receipts',
        'Offline Mode for zero downtime',
        'Standard tech support'
      ],
      proDesc: 'For fashion retailers with seasonal collections and multi-clerk teams.',
      proFeatures: [
        '<strong>Advanced Size / Color / Season matrix</strong>',
        'Barcode barcode label generation & printing',
        'Instant returns, exchanges & store credits',
        'Sales rep tracking & commission reporting',
        'Direct priority WhatsApp support'
      ],
      enterpriseDesc: 'For multi-store apparel chains, franchises, and fashion brands.',
      enterpriseFeatures: [
        'Centralized multi-store live stock visibility',
        '1-click garment transfers between stores',
        'Cross-store inventory lookup during fitting',
        'Omnichannel VIP client loyalty programs',
        'Dedicated account manager & bulk migration'
      ]
    }
  },
  pos: {
    badge: 'Vektor POS',
    color: '#06B6D4',
    es: {
      starterDesc: 'Para ultramarinos, ferreterías o comercios con 1 caja registradora.',
      starterFeatures: [
        '1 Terminal de caja táctil ultrarrápido',
        'Hasta 500 artículos y escaneo de códigos',
        'Arqueo de caja básico al final de jornada',
        'Modo Offline para cobros ininterrumpidos',
        'Soporte estándar por email'
      ],
      proDesc: 'Para supermercados, tiendas con alto flujo y múltiples puestos de cobro.',
      proFeatures: [
        '<strong>Puestos de caja ilimitados y simultáneos</strong>',
        'Arqueo ciego anti-descuadre en 60 segundos',
        'Conexión directa con balanzas y básculas',
        'Promociones 2x1, descuentos y fidelización',
        'Soporte prioritario por WhatsApp'
      ],
      enterpriseDesc: 'Para cadenas de supermercados, mayoristas y grandes superficies.',
      enterpriseFeatures: [
        'Gestión centralizada de precios y márgenes',
        'Gestión de almacén central y reaprovisionamiento',
        'Auditoría estricta de movimientos de caja',
        'Informes de rentabilidad y rotación por categoría',
        'Soporte 24/7 y despliegue llave en mano'
      ]
    },
    fr: {
      starterDesc: 'Pour épiceries, drogueries et commerces de quartier avec 1 caisse.',
      starterFeatures: [
        '1 Caisse tactile ultra-rapide',
        'Jusqu\'à 500 articles et lecteur code-barres',
        'Clôture de caisse simple en fin de journée',
        'Mode Hors-Ligne ininterrompu',
        'Support standard par email'
      ],
      proDesc: 'Pour supermarchés, supérettes et commerces à fort passage.',
      proFeatures: [
        '<strong>Postes de caisse illimités et synchronisés</strong>',
        'Clôture à l\'aveugle anti-fraude en 60 secondes',
        'Connexion directe balances et pesage',
        'Remises, promotions et fidélité client',
        'Support prioritaire direct sur WhatsApp'
      ],
      enterpriseDesc: 'Pour chaînes de supermarchés, négoce et moyennes surfaces.',
      enterpriseFeatures: [
        'Gestion centralisée des catalogues et prix',
        'Entrepôt central et réassort automatique',
        'Audit complet et traçabilité des caissiers',
        'Rapports de marge par rayon et catégorie',
        'Astreinte technique 24/7 et déploiement pro'
      ]
    },
    en: {
      starterDesc: 'For grocery stores, hardware shops, and retail counters with 1 station.',
      starterFeatures: [
        '1 High-speed touchscreen checkout terminal',
        'Up to 500 items and barcode scanner support',
        'Standard end-of-day drawer reconciliation',
        'Offline Mode for nonstop checkout',
        'Standard email support'
      ],
      proDesc: 'For supermarkets, high-traffic retailers, and busy multi-lane stores.',
      proFeatures: [
        '<strong>Unlimited simultaneous cashier lanes</strong>',
        '60-second blind cash count anti-theft',
        'Certified weighing scale integration',
        'Promotions, buy-one-get-one & loyalty points',
        'Priority direct WhatsApp support'
      ],
      enterpriseDesc: 'For supermarket chains, wholesale retail, and department stores.',
      enterpriseFeatures: [
        'Centralized multi-store price & margin control',
        'Central warehouse & auto-replenishment',
        'Forensic cashier audit trail & drawer alerts',
        'Departmental profitability & turnover reports',
        '24/7 dedicated support & turnkey rollout'
      ]
    }
  },
  drive: {
    badge: 'Vektor Drive',
    color: '#10B981',
    es: {
      starterDesc: 'Para pequeñas agencias de rent-a-car con flota de hasta 10 vehículos.',
      starterFeatures: [
        'Gestión de flota hasta 10 coches',
        'Generación de contrato PDF al momento',
        'Registro de salidas y entradas de vehículos',
        'Modo Offline para operar en parkings',
        'Soporte técnico por email'
      ],
      proDesc: 'Para rent-a-car en crecimiento con volumen continuo de alquileres.',
      proFeatures: [
        '<strong>Flota y alquileres ilimitados</strong>',
        'Inspección móvil con 4 fotos de carrocería',
        'Firma táctil digital del cliente en pantalla',
        'Control de fianza y nivel de combustible',
        'Soporte prioritario por WhatsApp'
      ],
      enterpriseDesc: 'Para redes de rent-a-car, aeropuertos y franquicias de alquiler.',
      enterpriseFeatures: [
        'Gestión multi-oficina y multi-aeropuerto',
        'Traspasos de flota y logística entre ciudades',
        'Conexión API con brokers y motores de reserva',
        'Informes de rentabilidad y ocupación por coche',
        'Gestor de cuenta y puesta en marcha express'
      ]
    },
    fr: {
      starterDesc: 'Pour agences de location indépendantes avec une flotte jusqu\'à 10 véhicules.',
      starterFeatures: [
        'Gestion de flotte jusqu\'à 10 véhicules',
        'Contrat officiel généré en PDF instantané',
        'Enregistrement départs et retours clés',
        'Mode Hors-Ligne pour parkings sans réseau',
        'Support technique par email'
      ],
      proDesc: 'Pour agences de location actives et loueurs professionnels.',
      proFeatures: [
        '<strong>Flotte et contrats de location illimités</strong>',
        'État des lieux photos sur smartphone (4 angles)',
        'Signature tactile numérique du locataire',
        'Contrôle carburant et blocage de caution',
        'Support prioritaire direct sur WhatsApp'
      ],
      enterpriseDesc: 'Pour réseaux de location, agences aéroports et flottes importantes.',
      enterpriseFeatures: [
        'Gestion multi-agences et gares/aéroports',
        'Transferts de véhicules et logistique inter-villes',
        'Connexion API plateformes et courtiers de résa',
        'Rentabilité unitaire et amortissement par véhicule',
        'Responsable de compte dédié et déploiement'
      ]
    },
    en: {
      starterDesc: 'For boutique car rental operators managing up to 10 fleet vehicles.',
      starterFeatures: [
        'Fleet management for up to 10 vehicles',
        'Instant digital PDF rental agreement generator',
        'Basic check-in and check-out logs',
        'Offline Mode for underground parking garages',
        'Standard email support'
      ],
      proDesc: 'For busy car rental businesses requiring speed and zero vehicle damage disputes.',
      proFeatures: [
        '<strong>Unlimited fleet size and rental contracts</strong>',
        'Mobile 4-photo exterior vehicle damage inspection',
        'On-screen touchscreen digital customer signature',
        'Fuel level & security deposit hold tracking',
        'Priority direct WhatsApp support'
      ],
      enterpriseDesc: 'For car rental franchise networks, airport hubs, and fleet operators.',
      enterpriseFeatures: [
        'Multi-branch and airport desk fleet operations',
        'Inter-city vehicle transit & logistics scheduling',
        'API booking engine & aggregator integrations',
        'Vehicle ROI, utilization & maintenance forecasting',
        'Dedicated account manager & turnkey training'
      ]
    }
  },
  business: {
    badge: 'Vektor Business',
    color: '#3B82F6',
    es: {
      starterDesc: 'Para profesionales y pymes comerciales con ciclo de facturación simple.',
      starterFeatures: [
        'Presupuestos y facturación comercial',
        '1 Almacén o depósito de mercancía',
        'Fichas de clientes y proveedores',
        'Modo Offline para facturar sin internet',
        'Soporte estándar por email'
      ],
      proDesc: 'Para mayoristas, distribuidoras y empresas con ciclo comercial completo.',
      proFeatures: [
        '<strong>Flujo completo Devis / BC / BL / Facture</strong>',
        'Multi-depósito con inventario valorado en tiempo real',
        'Tesorería avanzada: cheques, pagarés y cobros',
        'Facturación conforme a normativa fiscal',
        'Soporte prioritario por WhatsApp'
      ],
      enterpriseDesc: 'Para grandes distribuidoras, importadoras y empresas multisede.',
      enterpriseFeatures: [
        'Multi-empresa y consolidación contable',
        'Gestión de flotas de reparto y conductores',
        'Tarifas por cliente, rappels y condiciones especiales',
        'Exportación automática al software contable',
        'Consultoría de procesos y soporte dedicado'
      ]
    },
    fr: {
      starterDesc: 'Pour professionnels et PME avec facturation commerciale simple.',
      starterFeatures: [
        'Devis et facturation commerciale',
        '1 Dépôt ou entrepôt de marchandises',
        'Fichier clients et fournisseurs',
        'Mode Hors-Ligne pour facturer sans réseau',
        'Support standard par email'
      ],
      proDesc: 'Pour grossistes, distributeurs et entreprises de négoce complètes.',
      proFeatures: [
        '<strong>Chaîne commerciale intégrale Devis / BC / BL / Facture</strong>',
        'Multi-dépôts avec valorisation des stocks en direct',
        'Trésorerie complète : gestion des chèques et effets',
        'Facturation conforme aux normes légales',
        'Support prioritaire direct sur WhatsApp'
      ],
      enterpriseDesc: 'Pour grands distributeurs, importateurs et groupes multi-sociétés.',
      enterpriseFeatures: [
        'Multi-sociétés et consolidation financière',
        'Gestion des tournées de livraison et chauffeurs',
        'Grilles tarifaires personnalisées et remises volumes',
        'Exports comptables automatiques tous formats',
        'Consultant dédié et paramétrage sur mesure'
      ]
    },
    en: {
      starterDesc: 'For independent wholesalers and SMBs with simple invoicing needs.',
      starterFeatures: [
        'Quotes, estimates, and sales invoices',
        '1 Central storage warehouse',
        'Customer and vendor master profiles',
        'Offline Mode for continuous operation',
        'Standard email support'
      ],
      proDesc: 'For distributors, wholesale traders, and commercial supply companies.',
      proFeatures: [
        '<strong>Full trade cycle: Quote / Order / Delivery Note / Invoice</strong>',
        'Multi-warehouse with live valued stock levels',
        'Advanced treasury: checks, promissory notes & banking',
        'Compliant tax invoicing & receivables tracking',
        'Priority direct WhatsApp support'
      ],
      enterpriseDesc: 'For large distribution groups, import/export houses, and enterprises.',
      enterpriseFeatures: [
        'Multi-company consolidated financials',
        'Delivery dispatch & driver delivery routes',
        'Tiered client price lists, rebates & volume terms',
        'Automated accounting ERP exports',
        'Dedicated enterprise consultant & SLAs'
      ]
    }
  }
};

function initPricingFilter() {
  const filterBtns = document.querySelectorAll('[data-pricing-product]');
  if (!filterBtns.length) return;

  let currentProduct = 'gastro';

  function renderPricing(product) {
    currentProduct = product;
    const data = PRICING_PRODUCT_DATA[product] || PRICING_PRODUCT_DATA.gastro || PRICING_PRODUCT_DATA.all;
    const lang = (localStorage.getItem('vektor_lang') || 'es').toLowerCase();
    const localized = data[lang] || data.es || data.en;

    // Badges
    const starterBadge = document.getElementById('starterProductBadge');
    const proBadge = document.getElementById('proProductBadge');
    const enterpriseBadge = document.getElementById('enterpriseProductBadge');

    [starterBadge, proBadge, enterpriseBadge].forEach(badge => {
      if (!badge) return;
      if (data.badge) {
        badge.textContent = data.badge;
        badge.style.display = 'inline-block';
        badge.style.color = data.color;
        badge.style.borderColor = `${data.color}40`;
        badge.style.background = `${data.color}15`;
      } else {
        badge.style.display = 'none';
      }
    });

    // Descriptions
    const starterDesc = document.getElementById('starterDesc');
    const proDesc = document.getElementById('proDesc');
    const enterpriseDesc = document.getElementById('enterpriseDesc');

    if (starterDesc) starterDesc.textContent = localized.starterDesc;
    if (proDesc) proDesc.textContent = localized.proDesc;
    if (enterpriseDesc) enterpriseDesc.textContent = localized.enterpriseDesc;

    // Feature lists
    const starterList = document.getElementById('pricingFeaturesStarter');
    const proList = document.getElementById('pricingFeaturesPro');
    const enterpriseList = document.getElementById('pricingFeaturesEnterprise');

    if (starterList) {
      starterList.innerHTML = localized.starterFeatures
        .map(f => `<li class="pricing-feature-item">✓ <span>${f}</span></li>`)
        .join('');
    }
    if (proList) {
      proList.innerHTML = localized.proFeatures
        .map(f => `<li class="pricing-feature-item">✓ <span>${f}</span></li>`)
        .join('');
    }
    if (enterpriseList) {
      enterpriseList.innerHTML = localized.enterpriseFeatures
        .map(f => `<li class="pricing-feature-item">✓ <span>${f}</span></li>`)
        .join('');
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prod = btn.getAttribute('data-pricing-product');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPricing(prod);
    });
  });

  window.addEventListener('vektor_language_changed', () => {
    renderPricing(currentProduct);
  });

  // Render initial product (gastro)
  renderPricing(currentProduct);
}

// 5. DEMO MODAL CONTROLLER
function initDemoModal() {
  const modal = document.getElementById('demoModal');
  const openBtns = document.querySelectorAll('[data-open-demo]');
  const closeBtn = document.getElementById('closeDemoModal');
  const form = document.getElementById('demoForm');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'grid';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Modal tabs: Direct demo vs WhatsApp
  const tabDirect = document.getElementById('tabDirectBtn');
  const tabWhatsapp = document.getElementById('tabWhatsappBtn');
  const panelDirect = document.getElementById('panelDirectDemo');
  const panelWhatsapp = document.getElementById('panelWhatsappDemo');

  if (tabDirect && tabWhatsapp && panelDirect && panelWhatsapp) {
    tabDirect.addEventListener('click', () => {
      tabDirect.style.background = 'rgba(255,255,255,0.1)';
      tabDirect.style.borderColor = 'rgba(123, 224, 153, 0.4)';
      tabDirect.style.color = '#7BE099';
      tabWhatsapp.style.background = 'transparent';
      tabWhatsapp.style.borderColor = 'transparent';
      tabWhatsapp.style.color = '#94A3B8';
      panelDirect.style.display = 'block';
      panelWhatsapp.style.display = 'none';
    });
    tabWhatsapp.addEventListener('click', () => {
      tabWhatsapp.style.background = 'rgba(255,255,255,0.1)';
      tabWhatsapp.style.borderColor = 'rgba(123, 224, 153, 0.4)';
      tabWhatsapp.style.color = '#7BE099';
      tabDirect.style.background = 'transparent';
      tabDirect.style.borderColor = 'transparent';
      tabDirect.style.color = '#94A3B8';
      panelWhatsapp.style.display = 'block';
      panelDirect.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const product = form.querySelector('#demoProduct')?.value || 'General';
      const name = form.querySelector('#demoName')?.value || '';
      const phone = form.querySelector('#demoPhone')?.value || '';

      const text = encodeURIComponent(`Hola Vektor Labs! Me llamo ${name}. Quiero una demo para mi negocio sobre ${product}. Mi teléfono es ${phone}.`);
      window.open(`https://wa.me/34600000000?text=${text}`, '_blank');
      modal.style.display = 'none';
      alert('¡Gracias! Te estamos redirigiendo para activar tu demo de inmediato.');
    });
  }
}

// 5b. LANGUAGE SWITCHER CONTROLLER
function initLanguageSwitcher() {
  const currentLang = getActiveLanguage();
  setLanguage(currentLang);

  const langBtn = document.getElementById('langSwitcherBtn');
  const dropdown = document.getElementById('langDropdown');

  if (langBtn && dropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.querySelectorAll('.lang-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        setLanguage(lang);
        dropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-switcher-wrapper')) {
        dropdown.classList.remove('show');
      }
    });
  }
}

// 6. CARD SPOTLIGHT HOVER EFFECT (from SAS RENT CAR)
function initCardSpotlight() {
  window.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.bento-card, .feature-card, .comparison-card, .pricing-card, .mockup-display-frame');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 7. COOKIE CONSENT BANNER (RGPD / ePrivacy)
function initCookieConsent() {
  const CONSENT_KEY = 'vektor_cookie_consent';
  let banner = document.getElementById('vektorCookieBanner');

  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'vektorCookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-title">
          <img src="/vektorlaps-logo.jpeg" alt="Vektor Labs" class="cookie-banner-logo" style="width: 24px; height: 24px; border-radius: 6px; object-fit: cover; border: 1.5px solid rgba(123, 224, 153, 0.4); box-shadow: 0 0 10px rgba(123, 224, 153, 0.25); flex-shrink: 0;">
          <span>Preferencias de Cookies & Privacidad</span>
          <span class="tag">RGPD / ePrivacy</span>
        </div>
        <p class="cookie-banner-text">
          Utilizamos cookies esenciales para la operativa segura del TPV y la plataforma SaaS, así como analíticas opcionales para optimizar la velocidad y experiencia de uso. Puedes aceptar todas, rechazarlas o consultar nuestra <a href="/cookies.html">Política de Cookies</a> y <a href="/privacidad.html">Privacidad</a>.
        </p>
      </div>
      <div class="cookie-banner-actions">
        <button id="btnAcceptCookies" class="btn-primary-glow btn-sm">Aceptar Todas</button>
        <button id="btnNecessaryCookies" class="btn-secondary-glass btn-sm">Solo Necesarias</button>
      </div>
    `;
    document.body.appendChild(banner);
  }

  const savedConsent = localStorage.getItem(CONSENT_KEY);
  if (!savedConsent) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 800);
  }

  const acceptBtn = document.getElementById('btnAcceptCookies');
  const necBtn = document.getElementById('btnNecessaryCookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted_all');
      banner.classList.remove('show');
    });
  }

  if (necBtn) {
    necBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'necessary_only');
      banner.classList.remove('show');
    });
  }

  // Reopen trigger from footer link
  document.querySelectorAll('[data-cookie-settings], #openCookieSettings').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      banner.classList.add('show');
    });
  });

  // Handle cookies.html custom page buttons
  const pageAccept = document.getElementById('btnAcceptAllCookies');
  const pageReject = document.getElementById('btnRejectOptionalCookies');
  const statusMsg = document.getElementById('cookieStatusMsg');

  if (pageAccept) {
    pageAccept.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted_all');
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.textContent = '✓ Has aceptado todas las cookies.';
      }
    });
  }

  if (pageReject) {
    pageReject.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'necessary_only');
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.textContent = '✓ Guardado: únicamente cookies técnicas necesarias.';
      }
    });
  }
}

// 8. WHATSAPP FLOATING WIDGET
function initWhatsAppWidget() {
  if (document.getElementById('whatsappFloatBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'whatsappFloatBtn';
  btn.className = 'whatsapp-float-btn';
  btn.href = 'https://wa.me/34600000000?text=' + encodeURIComponent('Hola Vektor Labs! Me gustaría información sobre sus soluciones TPV.');
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Contactar por WhatsApp');
  btn.innerHTML = `
    <svg class="whatsapp-float-icon" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/>
    </svg>
    <span>¿Dudas? Habla con nosotros</span>
  `;
  document.body.appendChild(btn);
}

// 9. ADVANCED FAQ ACCORDION
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');
  const catBtns = document.querySelectorAll('.faq-cat-btn');

  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Optional: close other items
      items.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  if (catBtns.length) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
}

// 10. PRODUCT CATALOG CAROUSEL (Rotating right to left + navigation)
function initCatalogCarousel() {
  const track = document.getElementById('catalogTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.catalog-slide');
  const tabs = document.querySelectorAll('.catalog-tab');
  const dots = document.querySelectorAll('.catalog-dot');
  const prevBtn = document.querySelector('.catalog-prev');
  const nextBtn = document.querySelector('.catalog-next');
  const container = document.querySelector('.catalog-carousel-container');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayTimer = null;
  const AUTO_INTERVAL = 6000;

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, AUTO_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.index, 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoPlay();
      }
    });
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoPlay();
      }
    });
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoPlay();
    }, { passive: true });
  }

  // Initial state & start autoplay
  goToSlide(0);
  startAutoPlay();
}

// 11. CONTACT FORM HANDLER
function initContactForm() {
  const form = document.getElementById('vektorContactForm');
  if (!form) return;

  const successBox = document.getElementById('contactSuccessMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando mensaje...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
      form.reset();
      if (successBox) {
        successBox.style.display = 'block';
        setTimeout(() => {
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }, 600);
  });
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initProductSwitcher();
  initRoiCalculator();
  initCatalogCarousel();
  initContactForm();
  initPricingToggle();
  initPricingFilter();
  initDemoModal();
  initCardSpotlight();
  initCookieConsent();
  initWhatsAppWidget();
  initFaqAccordion();
  initGsapAnimations();
});


