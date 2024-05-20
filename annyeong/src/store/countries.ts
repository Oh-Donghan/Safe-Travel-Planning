import { atom, selector } from 'recoil';
import axios from 'axios';

export interface CountryData {
  country_nm: string;
  country_eng_nm: string;
  // 필요한 다른 속성들 추가
}

// Atom: 전역 상태를 정의
export const countriesState = atom<CountryData[]>({
  key: 'countriesState',
  default: [],
});

// Selector: 비동기 데이터를 가져오는 함수
export const countriesList = selector({
  key: 'countriesList',
  get: async ({ get }) => {
    const cachedData = get(countriesState);
    if (cachedData.length > 0) {
      return cachedData;
    }
    
    const apiKey = import.meta.env.VITE_ALERT_API_KEY;
    const baseUrl = `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${apiKey}`;
    const numOfRows = 100; // 한 페이지의 최대 항목 수
    const maxPageNo = 4; // 페이지 번호의 최대값
    let accumulatedData: CountryData[] = [];

    for (let pageNo = 1; pageNo <= maxPageNo; pageNo++) {
      const response = await axios.get(`${baseUrl}&numOfRows=${numOfRows}&pageNo=${pageNo}`);
      const pageData = response.data;
      if (pageData && pageData.data) {
        accumulatedData = accumulatedData.concat(pageData.data);
      }
    }

    console.log('Fetched Data:', accumulatedData); // 데이터가 불러올 때마다 콘솔에 찍힘
    return accumulatedData;
  },
});