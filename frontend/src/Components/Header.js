import { Heading } from '@chakra-ui/react';
import React from 'react'

const Header = () => {
  return (
    <Heading
      as="h2"
      size="xl"
      display={"flex"}
      justifyContent={"center"}
      py={4}
      color={"teal"}
    >
      CRUD APP
    </Heading>
  );
}

export default Header
