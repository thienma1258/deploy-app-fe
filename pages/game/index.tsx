import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useCallback, useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import GameService from "../../api/GameService";
import StorageService from "../../storage/StorageService";
import authContext from "../../context/userContext";
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

const Game: NextPage = () => {
  const [dataTop, setDataTop] = useState<any>([]);
  const { username } = useContext(authContext);
  const [score, setScore] = useState<any>(0);

  const fetchMyAPI = useCallback(async () => {
    var res = await GameService.topGaming();

    setDataTop(res || []);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const rollNumber = async (realScore: number) => {
    var rollTime = getRandomArbitrary(1, 20);
    for (var i = 0; i < rollTime; i++) {
      var scoreC = getRandomArbitrary(1, 1000);
      setScore(scoreC)
      await delay(100)
    }
    setScore(realScore);
    setTimeout(() => {
      alert(`congratilation you got ${realScore}`)
    }, 200);
    fetchMyAPI();
  };

  const onPlayGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    var storageName = StorageService.getItem<string>("name");
    if (!storageName) {
      alert("you must submit username");
      return;
    }
    var res = await GameService.play(storageName);
    rollNumber(res);
  };

  return (
    <Row>
      <Col>
        <Button variant="primary" onClick={onPlayGame}>
          PlayGame
        </Button>
        <h1>You score is {score}</h1>
        <h1>Top highest score</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {dataTop.map((data: { username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | null | undefined; score: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, i: number) => {
              // Return the element. Also pass key
              return (
                // eslint-disable-next-line react/jsx-key
                <tr
                  style={
                    username == data.username
                      ? { backgroundColor: "bisque" }
                      : {}
                  }
                >
                  <td>{i + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.score}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Game;
