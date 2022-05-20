// components/layout.js
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Typewriter from "typewriter-effect";
import StorageService from "../storage/StorageService";

import NavbarHeader from "./navbar";
import authContext from "../context/userContext";

type Layout = {
  children: React.ReactNode;
};

export default function Layout({ children }: Layout) {
  // eslint-disable-next-line react/no-direct-mutation-state
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    var storageName = StorageService.getItem<string>("name");
    if (storageName) {
      setUsername(storageName);
    }
  }, []);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onsubmitName = (e: React.MouseEvent<HTMLButtonElement>) => {
    var storageName = StorageService.getItem<string>("name");
    if (storageName) {
      alert("you have already submit username");
      return;
    }
    StorageService.setItem("name", name);
    setUsername(name);
    alert("submit name success");
  };

  return (
    <>
      <NavbarHeader />
      <authContext.Provider
        value={{  username, setUsername }}
      >
        <Container>
          <Row>
            <Card>
              <Card.Header>
                {" "}
                <h1>
                  {username.length > 0 ? (
                    `Welcome back ${username}`
                  ) : (
                    <>
                      {" "}
                      <Typewriter
                        onInit={(typewriter) => {
                          typewriter
                            .typeString(
                              username
                                ? `Welcome back ${username}`
                                : "Welcome to my coding challenge site please input usename"
                            )
                            .callFunction(() => {
                              console.log("String typed out!");
                            })
                            .pauseFor(2500)
                            .callFunction(() => {
                              console.log("All strings were deleted");
                            })
                            .start();
                        }}
                      />
                    </>
                  )}
                </h1>
              </Card.Header>
              <Card.Body>
                {username.length > 0 ? (
                  ""
                ) : (
                  <>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                      <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={onChangeName}
                      />
                    </InputGroup>
                    <Button variant="primary" onClick={onsubmitName}>
                      Submit
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col style={{ marginTop: "5em" }}>
              {" "}
              <main>{children}</main>
            </Col>
          </Row>
        </Container>
      </authContext.Provider>
    </>
  );
}
function handleChange(event: Event | undefined) {
  throw new Error("Function not implemented.");
}
