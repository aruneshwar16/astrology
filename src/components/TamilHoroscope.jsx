import React, { useState, useEffect } from 'react';
import './TamilHoroscope.css';

const zodiacSigns = [
  'மேஷம்', 'ரிஷபம்', 'மிதுனம்', 'கடகம்',
  'சிம்மம்', 'கன்னி', 'துலாம்', 'விருச்சிகம்',
  'தனுசு', 'மகரம்', 'கும்பம்', 'மீனம்'
];

const englishSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Multiple predictions for each aspect to rotate daily
const predictions = {
  'மேஷம்': [
    { description: 'இன்று உங்கள் முயற்சிகள் வெற்றி பெறும். புதிய வாய்ப்புகள் தேடி வரும்.' },
    { description: 'தொழில் ரீதியாக முன்னேற்றம் காணலாம். நீண்ட நாள் திட்டங்கள் வெற்றி பெறும்.' },
    { description: 'குடும்பத்தில் மகிழ்ச்சி நிலவும். உங்களின் உழைப்புக்கு பாராட்டு கிடைக்கும்.' },
    { description: 'புதிய முதலீடுகள் லாபம் தரும். வழக்குகள் சாதகமாக முடியும்.' },
    { description: 'உடல்நிலை சீராக இருக்கும். யோகா மற்றும் உடற்பயிற்சி உதவியாக இருக்கும்.' },
    { description: 'பணவரவு அதிகரிக்கும். வீடு, வாகனம் தொடர்பான சந்தர்ப்பங்கள் கிடைக்கும்.' },
    { description: 'புதிய நண்பர்கள் அறிமுகமாகலாம். தன்னம்பிக்கை அதிகரிக்கும்.' }
  ],
  'ரிஷபம்': [
    { description: 'குடும்பத்தில் மகிழ்ச்சி நிலவும். பணப்புழக்கம் அதிகரிக்கும்.' },
    { description: 'பணி இடத்தில் உங்கள் திறமைகள் அங்கீகரிக்கப்படும். புதிய பொறுப்புகள் கிடைக்கும்.' },
    { description: 'நீண்ட நாள் கனவுகள் நனவாகும். உறவினர்களின் ஆதரவு கிடைக்கும்.' },
    { description: 'உத்தியோகத்தில் வளர்ச்சி. பயணங்கள் நன்மை தரும்.' },
    { description: 'அதிர்ஷ்டமான சந்தர்ப்பங்கள் வரும். புதிய திட்டங்களை தொடங்கலாம்.' },
    { description: 'தொழில் முனைப்பில் முன்னேற்றம். வருமானம் திருப்திகரமாக இருக்கும்.' },
    { description: 'சமூகத்தில் உங்கள் மதிப்பு உயரும். குடும்ப உறவுகள் பலப்படும்.' }
  ],
  'மிதுனம்': [
    { description: 'உத்தியோகத்தில் வளர்ச்சி. மேலதிகாரிகளின் பாராட்டைப் பெறுவீர்கள்.' },
    { description: 'நண்பர்கள் மூலம் நல்ல தகவல்கள் கிடைக்கும். உற்சாகம் அதிகரிக்கும்.' },
    { description: 'வியாபாரத்தில் லாபம் கிடைக்கும். குடும்பத்தில் மகிழ்ச்சி நிலவும்.' },
    { description: 'பழைய பிரச்சனைகள் தீரும். புதிய முதலீடுகள் லாபம் தரும்.' },
    { description: 'பயணங்களால் நன்மை உண்டாகும். தொழில் வளர்ச்சி சிறப்பாக இருக்கும்.' },
    { description: 'உங்களின் கடின உழைப்பிற்கு இன்றைய நாள் வெற்றி தரும்.' },
    { description: 'நல்ல பரிசோதனை கிடைக்கும். புதிய அனுபவங்களை எதிர்நோக்கலாம்.' }
  ],
  'கடகம்': [
    { description: 'உங்கள் சிந்தனைகள் தெளிவாக இருக்கும். முக்கிய முடிவுகள் எடுக்கலாம்.' },
    { description: 'உத்தியோகத்தில் உயர்வு கிடைக்கும். பண வரவு அதிகரிக்கும்.' },
    { description: 'மனச்சோர்வு குறையும். உறவினர்களிடம் மகிழ்ச்சியாக இருப்பீர்கள்.' },
    { description: 'பழைய உறவுகள் மீண்டும் இணையும். தொழில் முனைப்பில் முன்னேற்றம்.' },
    { description: 'திடீர் பயணங்கள் நிகழலாம். உங்கள் மனநிலை மகிழ்ச்சியாக இருக்கும்.' },
    { description: 'கல்வி, போட்டித் தேர்வுகளில் நல்ல முன்னேற்றம் காணலாம்.' },
    { description: 'சமூகப் பதவி கிடைக்க வாய்ப்பு. பிறருக்கு உதவுவது மனநிறைவு தரும்.' }
  ],
  'சிம்மம்': [
    { description: 'உங்கள் செயல்கள் யாருக்கும் உதாரணமாக இருக்கும்.' },
    { description: 'புதிய வியாபாரத்திற்கான சந்தர்ப்பங்கள் கிடைக்கும்.' },
    { description: 'உங்கள் கனவுகள் நனவாகும். தொழில் வளர்ச்சி உண்டாகும்.' },
    { description: 'அதிர்ஷ்டம் கூடும். புதிய நண்பர்கள் கிடைக்கும்.' },
    { description: 'தன்னம்பிக்கை அதிகரிக்கும். புதிய வேலை வாய்ப்புகள் ஏற்படும்.' },
    { description: 'வீட்டில் உற்சாகமான சூழல் நிலவும்.' },
    { description: 'தன்னம்பிக்கை அதிகரிக்கும். புதிய விஷயங்களை முயற்சி செய்யலாம்.' }
  ],
  'கன்னி': [
    { description: 'உங்கள் மனநிலை தெளிவாக இருக்கும். சாதகமான முடிவுகள் எடுக்கலாம்.' },
    { description: 'அதிர்ஷ்டமான நாள். பயணங்கள் மகிழ்ச்சி தரும்.' },
    { description: 'புதிய முயற்சிகள் வெற்றி பெறும். பண வரவு திருப்திகரமாக இருக்கும்.' },
    { description: 'உறவினர்களின் ஆதரவு கிடைக்கும். குடும்ப உறவுகள் பலப்படும்.' },
    { description: 'சுயநலக்காரர்களிடமிருந்து விலகுவது நல்லது.' },
    { description: 'வெற்றி அடைய நல்ல நாள். தொழில் முதலீடுகள் செய்யலாம்.' },
    { description: 'நன்மைகள் எதிர்பார்த்ததை விட அதிகமாக கிடைக்கும்.' }
  ],
  'துலாம்': [
    { description: 'புதிய உறவுகள் ஏற்படும். நம்பிக்கையுடன் செயல்படுங்கள்.' },
    { description: 'வியாபாரத்தில் லாபம் கிடைக்கும். குடும்பத்தில் மகிழ்ச்சி நிலவும்.' },
    { description: 'உங்கள் திறமையை வெளிப்படுத்த நல்ல சந்தர்ப்பம்.' },
    { description: 'முக்கிய முடிவுகளை எடுக்கும் முன் கவனமாக இருங்கள்.' },
    { description: 'பழைய தோழர்கள் உதவியாக இருப்பார்கள்.' },
    { description: 'வீட்டு கட்டுமானம் தொடங்க நல்ல நேரம்.' },
    { description: 'மருத்துவச் செலவுகள் குறையும். மனநிலை மகிழ்ச்சியாக இருக்கும்.' }
  ],
  'மீனம்': [
    { description: 'உங்கள் உழைப்புக்கு பாராட்டு கிடைக்கும். புதிய வாய்ப்புகள் தேடி வரும்.' },
    { description: 'உத்தியோகத்தில் பதவி உயர்வு கிடைக்கும். குடும்ப உறவுகள் பலப்படும்.' },
    { description: 'உண்மையான நண்பர்கள் உதவியாக இருப்பார்கள்.' },
    { description: 'தொழில் முன்னேற்றம் கிடைக்கும். புதிய ஒப்பந்தங்கள் கைகூடும்.' },
    { description: 'உங்கள் ஆரோக்கியம் சிறப்பாக இருக்கும். உடற்பயிற்சி உதவியாக இருக்கும்.' },
    { description: 'அதிர்ஷ்டமான நாள். மனநிலையை கட்டுப்படுத்தி செயல்படவும்.' },
    { description: 'உறவினர்களிடமிருந்து நல்ல செய்தி வரலாம்.' }
  ]
};


const moods = [
  ['மகிழ்ச்சி', 'உற்சாகம்', 'நம்பிக்கை', 'தைரியம்', 'ஆர்வம்'],
  ['அமைதி', 'சுறுசுறுப்பு', 'மனநிறைவு', 'தன்னம்பிக்கை', 'தயை'],
  ['உற்சாகம்', 'மனச்சோர்வு நீக்கம்', 'விழிப்புணர்வு', 'நிலைத்த மனநிலை', 'மகிழ்ச்சி'],
  ['வெற்றி உணர்வு', 'நம்பிக்கை', 'திறமை வெளிப்பாடு', 'அதிர்ஷ்டம்', 'மனநலம்'],
  ['சுய முன்னேற்றம்', 'வீரம்', 'உறுதியான மனநிலை', 'காரியம் வெற்றியடையும் உணர்வு', 'மகிழ்ச்சி'],
  ['புதிய எண்ணங்கள்', 'மன நிறைவு', 'ஆற்றல் மிகுந்த நிலை', 'தன்னம்பிக்கை அதிகரிப்பு', 'தீர்க்கதரிசனம்'],
  ['சுறுசுறுப்பு', 'வெற்றி உறுதி', 'புதிய முயற்சிகள்', 'மன அமைதி', 'ஆன்மீக உணர்வு']
];

const colors = [
  ['சிவப்பு', 'தங்க நிறம்', 'பச்சை', 'நீலம்', 'ஊதா'],
  ['வெள்ளை', 'கருப்பு', 'இளஞ்சிவப்பு', 'செம்மணிநிறம்', 'கருநீலம்'],
  ['கிரே', 'மஞ்சள்', 'இளஞ்சிவப்பு', 'நீலப்பச்சை', 'காஃபி நிறம்'],
  ['வiolet', 'சாம்பல்', 'மழைக்கால நீலம்', 'பச்சை', 'மஞ்சள்'],
  ['கருமையான சிவப்பு', 'வெண்கல நிறம்', 'ஆரஞ்சு', 'நீலம்', 'பச்சை'],
  ['தங்க நிறம்', 'சிவப்பு', 'இளஞ்சிவப்பு', 'மஞ்சள்', 'நீலம்'],
  ['காஷ்மீர் நீலம்', 'கருநீலம்', 'செம்மஞ்சள்', 'கருமை', 'கரும்பச்சை']
];

const times = [
  ['காலை 7 மணி', 'காலை 9 மணி', 'மதியம் 12 மணி', 'மாலை 3 மணி', 'மாலை 6 மணி'],
  ['காலை 6 மணி', 'காலை 8 மணி', 'மதியம் 1 மணி', 'மாலை 4 மணி', 'இரவு 7 மணி'],
  ['காலை 5 மணி', 'காலை 10 மணி', 'மதியம் 2 மணி', 'மாலை 5 மணி', 'இரவு 8 மணி'],
  ['காலை 6:30 மணி', 'காலை 9:30 மணி', 'மதியம் 12:30 மணி', 'மாலை 3:30 மணி', 'இரவு 6:30 மணி'],
  ['காலை 7:15 மணி', 'காலை 10:15 மணி', 'மதியம் 1:15 மணி', 'மாலை 4:15 மணி', 'இரவு 7:15 மணி'],
  ['காலை 6:45 மணி', 'காலை 9:45 மணி', 'மதியம் 12:45 மணி', 'மாலை 3:45 மணி', 'இரவு 6:45 மணி'],
  ['காலை 8 மணி', 'காலை 11 மணி', 'மதியம் 2:30 மணி', 'மாலை 5:30 மணி', 'இரவு 9 மணி']
];

function TamilHoroscope() {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('ta-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Function to get consistent daily predictions based on date
  const getDailyHoroscope = (sign) => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
   
    const predictionIndex = dayOfYear % (predictions[sign]?.length || 3);
    const moodIndex = dayOfYear % moods.length;
    const colorIndex = (dayOfYear + zodiacSigns.indexOf(sign)) % colors.length;
    const timeIndex = (dayOfYear + 2 * zodiacSigns.indexOf(sign)) % times.length;
    const luckyNumber = ((dayOfYear + zodiacSigns.indexOf(sign)) % 9) + 1;
  
    return {
      description: predictions[sign]?.[predictionIndex]?.description || 'இன்று நல்ல நாள்.',
      mood: moods[moodIndex][dayOfYear % 5],  // Select one mood
      color: colors[colorIndex][dayOfYear % 5], // Select one color
      lucky_number: luckyNumber.toString(),
      lucky_time: times[timeIndex][dayOfYear % 5] // Select one lucky time
    };
  };

  const handleBookAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date(),
          consultationType: 'Tamil Horoscope'
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Appointment successfully booked!');
      } else {
        alert(data.message || 'Error booking appointment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error booking appointment');
    }
  };

  // Get zodiac sign image class
  const getZodiacClass = (sign) => {
    const index = zodiacSigns.indexOf(sign);
    return `zodiac-bg-${englishSigns[index].toLowerCase()}`;
  };

  return (
    <div className="tamil-horoscope-container">
      <h1>தினசரி ராசிபலன்</h1>
      <div className="current-date">
        {currentDate}
      </div>
      
      <div className="horoscope-grid">
        {zodiacSigns.map((sign, index) => {
          const horoscope = getDailyHoroscope(sign);
          return (
            <div key={sign} className={`horoscope-card ${getZodiacClass(sign)}`}>
              <div className="card-content">
                <h2>{sign}</h2>
                <h3>({englishSigns[index]})</h3>
                <div className="horoscope-details">
                  <p className="description">{horoscope.description}</p>
                  <p><strong>மனநிலை:</strong> {horoscope.mood}</p>
                  <p><strong>அதிர்ஷ்ட நிறம்:</strong> {horoscope.color}</p>
                  <p><strong>அதிர்ஷ்ட எண்:</strong> {horoscope.lucky_number}</p>
                  <p><strong>அதிர்ஷ்ட நேரம்:</strong> {horoscope.lucky_time}</p>
                  <button onClick={handleBookAppointment}>நேரம் ஒதுக்குக</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TamilHoroscope;
