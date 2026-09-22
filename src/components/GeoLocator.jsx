import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, Mail, Clock, Building2, Search, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CHANNEL_PARTNERS } from '../data/channelPartners';
import { TRANSLATIONS } from '../data/translations';

// Custom glowing HTML marker icon for Leaflet in BHUSEWA theme
const createCustomIcon = (type) => {
  const isSCA = type.includes("SCA");
  const color = isSCA ? "#ea580c" : "#1e40af";

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 2.5px solid #ffffff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 10px rgba(234,88,12,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export default function GeoLocator({ currentLang, preselectedState, onRouteToPartner }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedState, setSelectedState] = useState(preselectedState || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [routedPartnerId, setRoutedPartnerId] = useState(null);

  const filteredPartners = CHANNEL_PARTNERS.filter((partner) => {
    const matchesState = selectedState === "All" || partner.state === selectedState;
    const matchesQuery =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesQuery;
  });

  const handleRoute = (partner) => {
    setRoutedPartnerId(partner.id);
    if (onRouteToPartner) {
      onRouteToPartner(partner);
    }
  };

  const statesList = ["All", ...new Set(CHANNEL_PARTNERS.map(p => p.state))];

  return (
    <div style={{ padding: '1rem 0' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#fff7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ea580c'
          }}>
            <MapPin size={20} />
          </div>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#0f172a' }}>{t.geoTitle}</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
          {t.geoSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-card" style={{ padding: '1.2rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', background: '#ffffff', border: '1px solid #fed7aa' }}>
        
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ea580c' }} />
          <input
            type="text"
            placeholder={t.searchLocation}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ width: '100%', paddingLeft: '2.4rem' }}
          />
        </div>

        {/* State Dropdown */}
        <div style={{ minWidth: '200px' }}>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="form-control"
            style={{ width: '100%' }}
          >
            {statesList.map((st) => (
              <option key={st} value={st}>
                {st === "All" ? "All States & UTs" : st}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Showing <strong>{filteredPartners.length}</strong> accredited channel partners
        </div>

      </div>

      {/* Map & List Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.4fr) minmax(320px, 1fr)', gap: '1.5rem' }}>
        
        {/* Interactive Leaflet Map */}
        <div className="gov-card" style={{ padding: '0.5rem', height: '540px', position: 'relative', background: '#ffffff', border: '1px solid #fed7aa' }}>
          <MapContainer
            center={[22.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={true}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredPartners.map((p) => (
              <Marker
                key={p.id}
                position={[p.lat, p.lng]}
                icon={createCustomIcon(p.type)}
              >
                <Popup>
                  <div style={{ maxWidth: '240px', padding: '0.2rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>
                      {p.type}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, margin: '0.2rem 0 0.4rem', color: '#0f172a' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '0.4rem' }}>
                      {p.address}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 600 }}>
                      📞 {p.phone}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Partners List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '540px', overflowY: 'auto', paddingRight: '0.35rem' }}>
          {filteredPartners.map((partner) => {
            const isRouted = routedPartnerId === partner.id;

            return (
              <div
                key={partner.id}
                className="gov-card"
                style={{
                  padding: '1.2rem',
                  border: isRouted ? '2px solid #ea580c' : '1px solid #fed7aa',
                  background: isRouted ? '#fff7ed' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                    {partner.type}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 700 }}>
                    ★ {partner.rating} / 5.0
                  </span>
                </div>

                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem', color: '#0f172a' }}>
                  {partner.name}
                </h4>

                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem' }}>
                  {partner.address}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Phone size={13} color="#ea580c" />
                    <span>{partner.phone} ({partner.contactPerson})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Mail size={13} color="#ea580c" />
                    <span>{partner.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={13} color="#ea580c" />
                    <span>{partner.workingHours} (Avg. {partner.avgDisbursementDays} days turnaround)</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRoute(partner)}
                  className={`btn ${isRouted ? 'btn-gov-orange' : 'btn-outline-orange'}`}
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}
                >
                  {isRouted ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Application Routed to this SCA</span>
                    </>
                  ) : (
                    <>
                      <span>{t.routeApplication}</span>
                      <ArrowUpRight size={15} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
