import React from 'react';
import {useState, useEffect} from 'preact/hooks';
import axios from 'axios';

import style from './style.css';

const Advertisement = () => {
  const [data, setData] = useState({
    businessName: '',
    textBody: '',
    backlink: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/advertisements/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.container}>
      <p>{data.businessName}</p>
      <p>{data.textBody}</p>
      <a href={data.backlink}>
        <p>{data.backlink}</p>
      </a>
    </div>
  );
};

export default Advertisement;
