import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CountryData {
  country_nm: string;
  country_eng_nm: string;
  // 필요한 다른 속성들 추가
}

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [allData, setAllData] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  const fetchAllData = async () => {
    const apiKey = import.meta.env.VITE_ALERT_API_KEY;
    const baseUrl = `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${apiKey}`;
    const numOfRows = 100; // 한 페이지의 최대 항목 수
    const maxPageNo = 4; // 페이지 번호의 최대값
    let accumulatedData: CountryData[] = [];

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
    console.log(value);
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') return;

    // 데이터를 처음 가져올 때만 fetchAllData 호출
    if (allData.length === 0) {
      await fetchAllData();
    } else {
      filterAndNavigate();
    }
  };

  useEffect(() => {
    if (!isLoading && allData.length > 0) {
      filterAndNavigate();
    }
  }, [isLoading]);

  const filterAndNavigate = () => {
    const capitalizedSearch = capitalizeFirstLetter(search);
    const filtered = allData.filter(
      (item) =>
        item.country_nm === search ||
        capitalizeFirstLetter(item.country_eng_nm) === capitalizedSearch
    );

    setFilteredCountries(filtered);

    if (filtered.length > 0) {
      console.log('Filtered Data:', filtered);
      navigate(`/country/${search}`);
    } else {
      console.log(`No data found for the search term: ${search}`);
    }
  };

  return (
    <Wrapper>
      <Title>안전한 여행 계획 - 안녕!</Title>
      <form
        onSubmit={onSubmit}
        className='flex justify-center items-center gap-4 mt-16'
      >
        <Input
          onChange={onChange}
          className='dark:bg-my-bg bg-my-text dark:text-my-text text-my-bg'
          type='text'
          value={search}
          placeholder='원하는 나라를 검색하세요.'
          required
        />
        <Input
          type='submit'
          value={isLoading ? 'Loading...' : '떠나기'}
          className='bg-my-bg dark:bg-my-text text-my-text dark:text-my-bg dark:my-outline-dark'
          disabled={isLoading}
        />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 100px auto 0;
  max-width: calc(var(--size) * 60);
  height: calc(var(--size) * 40);
  outline: 1px solid #000;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  width: 60%;
  font-size: 16px;
  outline: none;
  &[type='submit'] {
    width: 10%;
    outline: 2px solid #faebef;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      background-color: #dda94b;
      color: #333d79;
      outline: 2px solid #dda94b;
      font-weight: bold;
      opacity: 0.9;
    }
  }
  &::placeholder {
    opacity: 0.9;
  }
`;