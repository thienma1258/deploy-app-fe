/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useCallback, useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import QuoteService from "../../api/QuoteService";
import { IoHandLeft,IoHandLeftOutline } from "react-icons/io5";
import StorageService from "../../storage/StorageService";
import authContext from "../../context/userContext";


const Quote: NextPage = () => {
  const [dataTop, setDataTop] = useState<any>([]);
  const { username } = useContext(authContext);

  const fetchMyAPI = useCallback(async () => {
    var res = await QuoteService.top();
    setDataTop(res);
  }, []);

  useEffect(() => {
    fetchMyAPI();
   
  }, []);

  const isPart= (parts: string | string[])=> {
    if (parts && parts.length >0  && parts.includes(username)){

        return true
    }
    return false;
  }
  const reactSocial= async (key:string,isLike?:boolean,isUnlike?:boolean)=> {
    if (!username || username.length ===0 ){
      alert("please submit you username first");
      return;
    }
    var res = await QuoteService.react(username,key,isLike,isUnlike);
    console.log(res);
    fetchMyAPI();
  }

  return (
    <Row>
      {dataTop.map((data: { quoteAuthor: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; quoteText: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; createdAt: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; quoteLink: string | undefined; likeUsers: string | any[]; key: string; unlikeUsers: string | any[]; }, i: any) => {
        console.log(data);
        // Return the element. Also pass key
        return (
          <Col xs={4}>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Author: {data.quoteAuthor} </Card.Title>
                <Card.Text>{data.quoteText}</Card.Text>
                <Card.Text>
                  createdAt : {data.createdAt ? data.createdAt : ""}
                </Card.Text>
                <Card.Text>
                  <a href={data.quoteLink}>link</a>
                </Card.Text>
                {isPart(data.likeUsers) ? <IoHandLeft/>: <IoHandLeftOutline/>}
                <Button disabled={isPart(data.likeUsers)} style={{ margin: "2rem" }} variant="primary"
                onClick={() => reactSocial(data.key,true)}
                >
                  {data.likeUsers ? data.likeUsers.length : "0"} Like
                </Button>

                {isPart(data.unlikeUsers) ? <IoHandLeft/>: <IoHandLeftOutline/>}
                <Button  variant="primary" disabled={isPart(data.unlikeUsers)} 
                   onClick={() => reactSocial(data.key,undefined,true)}
                >
                  {data.unlikeUsers ? data.unlikeUsers.length : "0"} UnLike
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Quote;
