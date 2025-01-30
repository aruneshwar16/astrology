import React from 'react';
import './TamilTemples.css';

const TamilTemples = () => {
  const temples = [
    {
      name: "Meenakshi Amman Temple, Madurai",
      image: "https://i0.wp.com/kidsnews.top/wp-content/uploads/2021/12/Meenakshi-Amman-Temple-Wikipedia.jpg?w=1280&ssl=1",
      info: "A historic temple dedicated to Goddess Meenakshi with 14 magnificent gopurams. Known for its stunning architecture and intricate sculptures dating back to the 17th century."
    },
    {
      name: "Brihadeeswarar Temple, Thanjavur",
      image: "https://t3.ftcdn.net/jpg/04/83/99/42/360_F_483994277_swklfyWmGq7cT6PzspdrQOWbFIrxYVFV.jpg",
      info: "UNESCO World Heritage site built by Raja Raja Chola I. Features one of the largest Shiva lingams and a massive Nandi statue carved from a single rock."
    },
    {
      name: "Ramanathaswamy Temple, Rameswaram",
      image: "https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/rameswaram-temple-1656167436_f2c551193bb7d4bc6f70.webp",
      info: "One of the Char Dham pilgrimage sites with the longest corridor among all Hindu temples. Famous for its 22 holy water wells and magnificent architecture."
    },
    {
      name: "Kapaleeshwarar Temple, Chennai",
      image: "https://www.mrpilot.in/blog/wp-content/uploads/2020/01/Kapaleeshwarar-Temple-Chennai.jpg",
      info: "Dedicated to Lord Shiva, this temple exemplifies Dravidian architecture. Known for its peacock-themed mandapa and colorful gopuram with intricate sculptures."
    },
    {
      name: "Arunachaleswarar Temple, Thiruvannamalai",
      image: "https://breathedreamgo.com/wp-content/uploads/2012/11/Tiruvannamalai_.jpg",
      info: "One of the largest temples in India, dedicated to Lord Shiva. Famous for its Karthigai Deepam festival and the sacred Girivalam path around Arunachala hill."
    },
    {
      name: "Nataraja Temple, Chidambaram",
      image: "https://t3.ftcdn.net/jpg/00/26/42/66/360_F_26426619_XTGJxv1U48CwXkVp2WRm1JgtLlVvlq58.jpg",
      info: "Ancient temple dedicated to Lord Shiva as the cosmic dancer. Known for its unique golden roof and the secret of the missing idol representing formless space."
    }
  ];

  return (
    <div className="temples-container">
      <div className="temples-header">
        <h1> Historical  Temples in SounthIndia </h1>
        <p>South Indian Temples for Propitiation</p>
      </div>
      
      <div className="temples-grid">
        {temples.map((temple, index) => (
          <div key={index} className="temple-card">
            <div className="temple-image">
              <img src={temple.image} alt={temple.name} loading="lazy" />
            </div>
            <div className="temple-content">
              <h2>{temple.name}</h2>
              <p>{temple.info}</p>
              <button className="visit-button" onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(temple.name)}`, '_blank')}>
                Plan Your Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TamilTemples;
