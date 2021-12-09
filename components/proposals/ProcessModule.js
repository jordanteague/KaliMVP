import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import {
  Input,
  Button
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";

export default function ProcessModule(props) {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address } = value.state;
  const p = props['p'];

  const process = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    if(account===null) {
      alert("Please connect to wallet");
    } else {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      const { dao, id } = array;

      try {

        const instance = new web3.eth.Contract(abi, address);

        let result = await instance.methods
          .processProposal(id)
          .send({ from: account });

        Router.reload(window.location.pathname);
      } catch (e) {
        alert(e);
        value.setLoading(false);
      }
    }

    value.setLoading(false);
  };

  return(
    <form onSubmit={process}>
      <Input
        type="hidden"
        name="dao"
      />
      <Input type="hidden" name="id" value={p["id"]} />
      <Button type="submit">Process</Button>
    </form>
  )
}
