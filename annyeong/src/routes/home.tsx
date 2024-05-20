import React, { useEffect, useState } from 'react';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { countriesList, countriesState, CountryData } from '../store/countries';
import { styled } from 'styled-components';

export default function Home() {
  const countriesLoadable = useRecoilValueLoadable(countriesList);
  const setCountries = useSetRecoilState(countriesState);
  const countries = useRecoilValueLoadable(countriesState).contents;

  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const [isValidSelection, setIsValidSelection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countriesLoadable.state === 'hasValue') {
      setCountries(countriesLoadable.contents);
    }
  }, [countriesLoadable, setCountries]);

  useEffect(() => {
    if (countries.length > 0 && inputValue) {
      const filtered = countries.filter(
        (item: CountryData) =>
          item.country_nm.includes(inputValue) ||
          item.country_eng_nm.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCountries(filtered);
      setIsValidSelection(false);
    } else {
      setFilteredCountries([]);
      setIsValidSelection(false);
    }
  }, [inputValue, countries]);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsValidSelection(false);
  };

  const handleItemClick = (countryName: string, countryEngName: string) => {
    setInputValue(countryName);
    setFilteredCountries([]);
    setIsValidSelection(true);
    navigate(`/country/${encodeURIComponent(countryEngName.toLowerCase())}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidSelection && inputValue.trim()) {
      const selectedCountry = countries.find(
        (country) => country.country_nm === inputValue
      );
      if (selectedCountry) {
        navigate(`/country/${encodeURIComponent(selectedCountry.country_eng_nm.toLowerCase())}`);
      }
    }
  };

  return (
    <Wrapper>
      <Title>안전한 여행 계획 - 안녕!</Title>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          onChange={handleInputValue}
          value={inputValue}
          placeholder="원하는 나라를 검색하세요."
          className="dark:bg-my-bg bg-my-text dark:text-my-text text-my-bg"
          required
        />
        {filteredCountries.length > 0 && (
          <Dropdown>
            {filteredCountries.map((country) => (
              <DropdownItem
                key={country.country_nm}
                onClick={() => handleItemClick(country.country_nm, country.country_eng_nm)}
              >
                {country.country_nm} ({country.country_eng_nm})
              </DropdownItem>
            ))}
          </Dropdown>
        )}
        <Input
          type="submit"
          className="bg-my-bg dark:bg-my-text text-my-text dark:text-my-bg dark:my-outline-dark"
          value="떠나기"
        />
      </SearchForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 100px auto 0;
  max-width: 800px;
  height: auto;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 100px;
  position: relative;
  height: 40px;
`;

const Input = styled.input`
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

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  width: 60%;
  background-color: #333d79;
  color: #faebef;
  border: 1px solid #dda94b;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
  }
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #faebef;
    color: #333d79;
  }
`;
