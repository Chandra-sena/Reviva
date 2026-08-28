import { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  content: string;
}

export const HomebuyersCorner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'guide'>('about');
  const [openId, setOpenId] = useState<string | null>('about-1');

  const aboutArticles: ArticleItem[] = [
    {
      id: 'about-1',
      title: 'Eco-Conscious Standards in Indian Real Estate 2026: Reviva’s Quality Approach',
      content: 'Reviva stands as a beacon of eco-conscious excellence, implementing thoughtful engineering standards across all residential developments in Bengaluru. With energy-efficient technology, sustainably sourced building materials, and rigorous quality audits, Reviva ensures every apartment, villa, and row house exceeds expectations.'
    },
    {
      id: 'about-2',
      title: 'Awards and Recognitions of Reviva – A Benchmark in Indian Real Estate',
      content: 'Reviva has been honored with prestigious real estate and construction recognitions, including "Developer of the Year", "Top Eco-Conscious Builder", and "Best Quality Assurance Brand" in India.'
    },
    {
      id: 'about-3',
      title: 'Reviva Projects: Bringing Meaning to Life, One Community at a Time',
      content: 'Reviva was founded on the idea of creating spaces that embody life, growth, and harmony. With over 130+ million square feet delivered and 530+ completed projects, Reviva continues to pioneer sustainable, purposeful living.'
    },
    {
      id: 'about-4',
      title: 'How to Explore Reviva Properties Online: A Complete Guide',
      content: 'Exploring Reviva homes online is seamless. Utilize our 3D virtual walkthroughs, detailed floor plans, unit configuration filters, and real-time EMI calculators to select your dream home from the comfort of your couch.'
    },
    {
      id: 'about-5',
      title: 'Why Reviva Is Among the Most Trusted Developers in India',
      content: 'Trust is built through transparency and thoughtful, eco-conscious design. Reviva delivers 100% of projects with RERA approvals, clear land titles, on-time delivery track records, and superior resale capital appreciation.'
    }
  ];

  const guideArticles: ArticleItem[] = [
    {
      id: 'guide-1',
      title: 'Bengaluru Real Estate Market Growth & Price Appreciation Trends 2026',
      content: 'Bengaluru remains India’s top IT hub and residential investment hotspot. Key corridors like Panathur Main Road, Sarjapur Road, and Whitefield have shown an average annual price appreciation of 12% to 15%.'
    },
    {
      id: 'guide-2',
      title: 'Top High-Yield Residential Corridors: Panathur, Whitefield & Sarjapur',
      content: 'With proximity to major tech parks (Manyata, ITPL, Embassy TechVillage) and expanding Metro lines, East and North Bengaluru offer high rental yields ranging from 4.5% to 6.2%.'
    },
    {
      id: 'guide-3',
      title: 'Understanding Khata Certificate, Encumbrance & RERA Approvals in Karnataka',
      content: 'When purchasing property in Bengaluru, verifying A-Khata certification, E-C (Encumbrance Certificate), and Karnataka RERA registration is paramount for secure legal title ownership.'
    },
    {
      id: 'guide-4',
      title: 'Guide to Buying Off-Plan vs Ready-to-Move Apartments in Bengaluru',
      content: 'Off-plan under-construction properties offer flexible payment plans and lower initial pricing, while ready-to-move-in homes offer instant possession and tax benefits under Section 24.'
    }
  ];

  const currentArticles = activeTab === 'about' ? aboutArticles : guideArticles;

  return (
    <section id="homebuyers-corner" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Main Box matching Screenshot 3 */}
        <div 
          className="glass-panel" 
          style={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#111827',
            padding: '2rem', 
            borderRadius: '14px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          {/* Header Title with Home Icon */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#9E783C', padding: '0.85rem', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Home size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>Homebuyers’ Corner</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Essential Resources & Property Buying Guides</p>
              </div>
            </div>

            <ChevronDown size={24} color="#6b7280" />
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => { setActiveTab('about'); setOpenId('about-1'); }}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: activeTab === 'about' ? '#ece4f7' : '#f3f4f6',
                color: activeTab === 'about' ? '#9E783C' : '#4b5563',
                borderBottom: activeTab === 'about' ? '3px solid #9E783C' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              About Reviva
            </button>

            <button
              onClick={() => { setActiveTab('guide'); setOpenId('guide-1'); }}
              style={{
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: 700,
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: activeTab === 'guide' ? '#ece4f7' : '#f3f4f6',
                color: activeTab === 'guide' ? '#9E783C' : '#4b5563',
                borderBottom: activeTab === 'guide' ? '3px solid #9E783C' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Bengaluru Property Guide
            </button>
          </div>

          {/* Accordion Articles List matching Screenshot 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentArticles.map((article) => {
              const isOpen = openId === article.id;
              return (
                <div 
                  key={article.id} 
                  style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : article.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '0.75rem 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#1f2937'
                    }}
                  >
                    <span style={{ paddingRight: '1rem' }}>{article.title}</span>
                    <ChevronDown 
                      size={18} 
                      color="#6b7280"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }} 
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0.5rem 0 1rem 0', color: '#4b5563', fontSize: '0.925rem', lineHeight: 1.7 }}>
                      {article.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
