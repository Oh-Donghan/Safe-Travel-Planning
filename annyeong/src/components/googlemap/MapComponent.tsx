import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

type GoogleGeocodingResponse = {
  results: {
    results: { geometry: { location: { lat: number; lng: number } } }[];
  };
  status: 'OK' | 'ZERO_RESULTS';
};

export default function MapComponent() {
  const [changeInput, setChangeInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChangeInput(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myKEY = import.meta.env.VITE_G_MAP_API_KEY;

    axios
      .get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
          changeInput
        )}&key=${myKEY}`
      )
      .then((response) => {
        if (response.data.status !== 'OK') {
          throw new Error('Could not fetch location!');
        }
        const coordinates = response.data.results[0].geometry.location;
        // const map = new google.maps.Map(document.getElementById('map'), {

        // })
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <GMap id='map'>
        <p>Please enter an address!</p>
      </GMap>
      <Form onSubmit={onSubmit}>
        <Input
          type='text'
          id='address'
          value={changeInput}
          onChange={onChange}
        />
        <button type='submit'>SEARCH ADDRESS</button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const GMap = styled.div`
  width: 90%;
  height: 20rem;
  border: 1px solid #ccc;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Form = styled.form`
  text-align: center;
  margin: 2rem auto;
`;

const Input = styled.input`
  color: #000;
`;
