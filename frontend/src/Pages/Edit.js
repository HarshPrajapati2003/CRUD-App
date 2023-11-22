import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import UserForm from '../Components/UserForm'
import { Box } from '@chakra-ui/react'

const Edit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [input, setInput] = useState({
      name: "",
      email: "",
    });

    useEffect(() => {
        getSingleRecord()
    },[])

    const getSingleRecord = async () => {
        const res = await axios.get(`/users/${id}`);
        setInput(res.data);
    }
    
    const handleSubmit = async () => {
        await axios.put(`/users/${id}`, input);
        navigate("/")
    }

  return (
    <>
      <Box px={12}>
        <Header />
        <UserForm
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
        />
      </Box>
    </>
  );
}

export default Edit
