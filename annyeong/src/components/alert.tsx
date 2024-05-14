import { useState, useEffect } from 'react';
import axios from 'axios';

function TravelAlarmLogger() {
  const [continentName, setContinentName] = useState('');
  const [allData, setAllData] = useState([]);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setContinentName(e.target.value);
  };

  // 모든 데이터를 컴포넌트가 마운트될 때 가져와 콘솔에 출력합니다.
  useEffect(() => {
    const fetchAllData = async () => {
      const apiKey = import.meta.env.VITE_ALERT_API_KEY;
      const baseUrl = `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${apiKey}`;
      const numOfRows = 100; // 한 페이지의 최대 항목 수
      const maxPageNo = 4; // 페이지 번호의 최대값
      let accumulatedData = [];

      try {
        // 각 페이지 데이터를 순차적으로 요청하여 배열에 추가합니다.
        for (let pageNo = 1; pageNo <= maxPageNo; pageNo++) {
          const response = await axios.get(
            `${baseUrl}&numOfRows=${numOfRows}&pageNo=${pageNo}`
          );
          const pageData = response.data;

          // 응답 데이터가 예상한 구조인지 확인하고 안전하게 추가합니다.
          if (pageData && pageData.data) {
            accumulatedData = accumulatedData.concat(pageData.data);
          }
        }

        // 모든 데이터를 콘솔에 출력하고 상태로 저장합니다.
        console.log('All Data:', accumulatedData);
        setAllData(accumulatedData);
      } catch (e) {
        console.log('Error fetching travel alarms:', e);
      }
    };

    fetchAllData();
  }, []); // 의존성 배열이 빈 상태로 설정되어 컴포넌트가 마운트될 때만 실행됩니다.

  // 입력된 대륙 이름으로 데이터를 필터링합니다.
  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredCountries = allData.filter(
      (item) => item.country_nm === continentName
    );

    if (filteredCountries.length > 0) {
      console.log('Filtered Data by Continent:', filteredCountries);
    } else {
      console.log(`No data found for the continent: ${continentName}`);
    }
  };

  return (
    <div>
      <h1>Retrieve All Travel Alarm Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Continent Name:
          <input
            type='text'
            value={continentName}
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default TravelAlarmLogger;
