const vehicles = [
  { icon: '#veh-sedan',  label: 'Sedan',          count: '4,200+ parts' },
  { icon: '#veh-suv',    label: 'SUV / Crossover', count: '6,800+ parts' },
  { icon: '#veh-pickup', label: 'Pickup Truck',    count: '9,400+ parts' },
  { icon: '#veh-hatch',  label: 'Hatchback',       count: '2,100+ parts' },
  { icon: '#veh-coupe',  label: 'Coupe',           count: '1,300+ parts' },
  { icon: '#veh-van',    label: 'Van / Cargo',     count: '1,900+ parts' },
]

export default function VehicleTypes() {
  return (
    <section className="section section--soft" style={{ paddingBlock: 'clamp(48px,6vw,80px)' }}>
      <div className="container">
        <div className="section__head" style={{ marginBottom: 24 }}>
          <div>
            <span className="eyebrow">Shop by vehicle type</span>
            <h2 style={{ marginTop: 12, fontSize: 'clamp(24px,2.6vw,34px)' }}>Find parts faster.</h2>
          </div>
        </div>
        <div className="fits">
          {vehicles.map(({ icon, label, count }) => (
            <a key={label} className="fit" href="#">
              <svg><use href={icon} /></svg>
              <strong>{label}</strong>
              <span>{count}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
