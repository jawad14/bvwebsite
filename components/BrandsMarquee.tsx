const brands = [
  'Ford','Chevrolet','RAM','Toyota','Honda',
  'Nissan','Hyundai','Kia','GMC','Jeep',
  'Dodge','Subaru','Mazda','Volkswagen','BMW',
]

export default function BrandsMarquee() {
  return (
    <div className="brands-marquee" aria-hidden="true">
      <div className="brands-marquee__inner">
        {[...brands, ...brands].map((b, i) => (
          <span key={i}>{b}</span>
        ))}
      </div>
    </div>
  )
}
