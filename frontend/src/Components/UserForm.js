import { Box, Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const UserForm = ({ handleSubmit, input, setInput }) => {
  return (
    <>
      {/* <Box w={{ base: "100%", md: "35%" }} pr={{ md: 3 }}> */}
        <FormControl>
          <FormLabel>Enter Your Name : </FormLabel>
          <Input
            type="text"
            name="name"
            Box
            value={input.name}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
          <FormLabel mt={2}>Email address : </FormLabel>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <Button colorScheme="blue" size="md" my={2} onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      {/* </Box> */}
    </>
  );
};

export default UserForm
