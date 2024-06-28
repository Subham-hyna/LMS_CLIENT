import React, { useEffect, useState } from 'react'
import './PageHeading.css'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchResultLoader from '../Loader/SearchResultLoader/SearchResultLoader';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

const PageHeading = ({heading, subHeading, searchHandler, placeholder, button, searchData,  issueSearch}) => {
    const [searchBoxValue, setSearchBoxValue] = useState("");
    const [searchResult, setSearchResult] = useState(false);

    const {loading, users} = useSelector((state)=>state.user);

    const submitHandler = (e) => {
        e.preventDefault();
        searchHandler(searchBoxValue);
    }

    const changeSearchBoxResult = () => {
        setSearchResult(false);
    }

    useEffect(()=>{
        setSearchResult(searchData);
    },[searchData])


  return (
    <div className='page-heading' onClick={changeSearchBoxResult}>
        <div className='page-heading-left'>
                <p>{heading}</p>
                <p>{subHeading}</p>
        </div>
        <div className='page-heading-right'>
            {placeholder && <form className='page-heading-searchBox' onSubmit={submitHandler}>
                <input type='text' placeholder={`Search ${placeholder}`} onChange={(e)=>{setSearchBoxValue(e.target.value)}} value={searchBoxValue}/>
                <Tooltip title="Search">
                <SearchRoundedIcon onClick={submitHandler}  />
                </Tooltip>
                {searchResult && <div className='search-result'>
                   {loading ? <SearchResultLoader/> : <>{users && 
                    users.length === 0 ?
                    <>{<span><h5>{`No Users by ${searchBoxValue}`}</h5></span>}</>
                    :
                   users.slice(0,4).map((s,i)=>(
                        <div key={i}
                        onClick={()=>{issueSearch(s._id,s.name)}}
                        >
                            <img src={s.avatar.url} alt='avatar-pic' />
                            <div>
                            <p>{s.name}</p>
                            <p>{s.registrationNo}</p>
                            </div>
                        </div>
                    ))}</>}
                </div>}
            </form>}
            {button && button}
        </div>
    </div>
  )
}

export default PageHeading