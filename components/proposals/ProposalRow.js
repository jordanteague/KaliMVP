import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
//import ProposalDetails from './ProposalDetails';
import {
  Input,
  Button,
  Text,
  Flex,
  Box,
  Icon,
  Stack,
  VStack,
  Center,
  Divider,
  Modal,
  Progress
} from "@chakra-ui/react";
import {
  AiOutlinePlusCircle
} from "react-icons/ai";
import {
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
  BsPlusCircle,
  BsXCircle
} from "react-icons/bs";
import {
  BiLoaderCircle
} from "react-icons/bi";
import FlexOutline from '../elements/FlexOutline';
import Timer from './Timer';
import { proposalDescriptions } from '../../utils/appParams';
import { useClipboard } from '@chakra-ui/react'
import ProposalModal from './ProposalModal';
import ProposalIcon from './ProposalIcon';
import { useDisclosure } from '@chakra-ui/react';

const iconSize = 8;

export default function ProposalRow(props) {
  const value = useContext(AppContext);
  const { web3, loading } = value.state;
  const p = props['p'];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ProposalModal p={p} />
      </Modal>
      <Box border="1px solid" rounded="xl" borderColor="black" padding="25px" margin="5px">
        <VStack>

          <ProposalIcon p={p} />

          <Text casing="uppercase">{proposalDescriptions[p['proposalType']]}</Text>
          <Timer expires={p['expires']} open={p['open']} />
          <Progress width="100%" colorScheme='green' backgroundColor='pink' value={p['progress']} />

          <Text casing="uppercase">{p['passing']}</Text>

          <Divider w="80%" align="center" />

          <Button key={p['id']} onClick={onOpen}>Review</Button>

        </VStack>
      </Box>
    </>
  )
}
