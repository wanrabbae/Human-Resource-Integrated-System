import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GetNewsDetail } from '../../../Repository/NewsRepository';
import parse from 'html-react-parser';
function DetailNews() {
    const { id } = useParams();
    const [data, setData] = useState([])

    const inAwait = async () => {
        var news = await GetNewsDetail(id);
        setData(news.data);
        console.log("ini news", news.data);
    };
    useEffect(() => {
        inAwait()
    }, []);

    return (
        <div className='space-y-3'>
            <h1 className='text-lg font-semibold'>{data.title}</h1>
            <p className='text-sm font-thin'>{moment(data.createdAt).format('L')}</p>
            <img crossOrigin='anonymous' className='h-[300px] w-auto' src={data.image} />
            <div>
                {parse(`${data.desc}`)}
            </div>
        </div>
    )
}

export default DetailNews