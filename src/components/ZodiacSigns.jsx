import React, { useState } from 'react';
import './ZodiacSigns.css';
import HoroscopeModal from './HoroscopeModal';
import { zodiacPredictions, tamilMoods, tamilColors } from '../data/tamilHoroscopes';

const ZodiacSigns = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentDate = () => {
    const days = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
    const months = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
    
    const today = new Date();
    const day = days[today.getDay()];
    const date = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    
    return { day, date, month, year };
  };

  const { day, date, month, year } = getCurrentDate();

  const getRandomLuckyTime = () => {
    const hours = Math.floor(Math.random() * 12) + 1;
    const minutes = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
    const period = hours < 6 ? 'காலை' : 'மாலை';
    return `${period} ${hours}:${minutes}`;
  };

  const fetchHoroscope = async (sign) => {
    setLoading(true);
    try {
      // Get the day of year to determine which prediction to show
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 0);
      const diff = today - start;
      const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Get Tamil predictions for the sign
      const signData = zodiacPredictions[sign];
      const predictionIndex = dayOfYear % signData.predictions.length;

      // Generate random values for other attributes
      const moodKeys = Object.keys(tamilMoods);
      const colorKeys = Object.keys(tamilColors);
      const luckyNumber = (dayOfYear % 9) + 1;

      setHoroscope({
        sign: signData.tamil,
        description: signData.predictions[predictionIndex],
        color: tamilColors[colorKeys[dayOfYear % colorKeys.length]],
        lucky_number: luckyNumber.toString(),
        lucky_time: getRandomLuckyTime(),
        mood: tamilMoods[moodKeys[dayOfYear % moodKeys.length]]
      });
    } catch (error) {
      console.error('Error generating horoscope:', error);
      // Fallback data
      setHoroscope({
        sign: zodiacPredictions[sign].tamil,
        description: 'இன்று உங்களுக்கு நல்ல நாள். எல்லா செயல்களும் வெற்றி பெறும்.',
        color: 'தங்க நிறம்',
        lucky_number: '7',
        lucky_time: 'காலை 10:30',
        mood: 'மகிழ்ச்சி'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignClick = async (sign) => {
    setSelectedSign(sign);
    await fetchHoroscope(sign);
  };

  const zodiacData = [
    {
      sign: 'Aries',
      date: 'March 21 - April 19',
      element: 'Fire',
      traits: 'Confident, courageous, enthusiastic, impulsive, energetic',
      image: 'https://imagesvs.oneindia.com/webp/ta/img/2022/07/mesham-1658649355.jpg'
    },
    {
      sign: 'Taurus',
      date: 'April 20 - May 20',
      element: 'Earth',
      traits: 'Patient, reliable, warmhearted, determined, practical',
      image: 'https://imagesvs.oneindia.com/webp/ta/img/2022/07/rishabam-1658649364.jpg'
    },
    {
      sign: 'Gemini',
      date: 'May 21 - June 20',
      element: 'Air',
      traits: 'Adaptable, versatile, intellectual, communicative',
      image: 'https://imagesvs.oneindia.com/ta/img/2020/02/astro-mithuman-1-1582220404.jpg'
    },
    {
      sign: 'Cancer',
      date: 'June 21 - July 22',
      element: 'Water',
      traits: 'Emotional, loving, intuitive, protective, home-loving',
      image: 'https://tamil.boldsky.com/img/2019/07/4-1563513201.jpg'
    },
    {
      sign: 'Leo',
      date: 'July 23 - August 22',
      element: 'Fire',
      traits: 'Generous, warmhearted, creative, enthusiastic, broad-minded',
      image: 'https://imagesvs.oneindia.com/ta/img/2019/11/astro-simmam-1-2-1574401554.jpg'
    },
    {
      sign: 'Virgo',
      date: 'August 23 - September 22',
      element: 'Earth',
      traits: 'Modest, shy, meticulous, reliable, practical',
      image: 'https://imagesvs.oneindia.com/webp/ta/img/2022/07/kanni-1658649396.jpg'
    },
    {
      sign: 'Libra',
      date: 'September 23 - October 22',
      element: 'Air',
      traits: 'Diplomatic, romantic, charming, social, idealistic',
      image: 'https://imagesvs.oneindia.com/ta/img/2019/05/astro-thulam-1-1559274395.jpg'
    },
    {
      sign: 'Scorpio',
      date: 'October 23 - November 21',
      element: 'Water',
      traits: 'Determined, forceful, emotional, intuitive, powerful',
      image: 'https://tamil.boldsky.com/img/2018/04/cover-1523700925.jpg'
    },
    {
      sign: 'Sagittarius',
      date: 'November 22 - December 21',
      element: 'Fire',
      traits: 'Optimistic, freedom-loving, jovial, good-humored',
      image: 'https://imagesvs.oneindia.com/ta/img/2019/11/astro-dhanusu4-1574312846.jpg'
    },
    {
      sign: 'Capricorn',
      date: 'December 22 - January 19',
      element: 'Earth',
      traits: 'Practical, prudent, ambitious, disciplined',
      image: 'https://imagesvs.oneindia.com/ta/img/2022/07/makaram-1658649512.jpg'
    },
    {
      sign: 'Aquarius',
      date: 'January 20 - February 18',
      element: 'Air',
      traits: 'Friendly, humanitarian, honest, loyal, original',
      image: 'https://imagesvs.oneindia.com/ta/img/2022/07/kumbam-1658649520.jpg'
    },
    {
      sign: 'Pisces',
      date: 'February 19 - March 20',
      element: 'Water',
      traits: 'Imaginative, sensitive, compassionate, kind, selfless',
      image: 'https://imagesvs.oneindia.com/ta/img/2019/05/astro-meenam-1-1519-1557125987.jpg'
    }
  ];

  return (
    <div className="zodiac-container">
      <div className="current-date">
        <span className="day">{day}</span>
        {date} {month} {year}
      </div>
      <h1> ராசி பலன்கள் </h1>
      <div className="zodiac-grid">
        {zodiacData.map((zodiac) => (
          <div 
            key={zodiac.sign}
            className="zodiac-card"
            onClick={() => handleSignClick(zodiac.sign)}
          >
            <img src={zodiac.image} alt={zodiac.sign} />
            <div className="zodiac-info">
              <h3>{zodiacPredictions[zodiac.sign].tamil}</h3>
              <p>{zodiac.date}</p>
              <p>Element: {zodiac.element}</p>
              <p>Traits: {zodiac.traits}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {horoscope && (
        <HoroscopeModal
          horoscope={horoscope}
          onClose={() => {
            setHoroscope(null);
            setSelectedSign(null);
          }}
        />
      )}
    </div>
  );
};

export default ZodiacSigns;
