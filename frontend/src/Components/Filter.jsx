import React, { useState, useEffect } from 'react';
import Table from './table';

const Filter = ({ data }) => {
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search) { 
            setShow(true)
            const regex = new RegExp(search, 'i');
            const filteredData = data.filter((item) => regex.test(item.word));
            setFiltered(filteredData);
        } else {
            setFiltered([]);
        }
    }, [search,data]);

    return (
        <div className='m-auto mb-4 '>
            <input className='block m-auto md:w-[50%] w-[80%] border-[2px] p-2 rounded-sm border-yellow-200' value={search} onChange={handleChange} placeholder='search word here' />

            {show&&search ? <Table data={filtered} caption={"Searched word"} /> : ''}
        </div>
    );
};

export default Filter;
