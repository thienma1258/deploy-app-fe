import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Alert, Table } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import GeoService from "../api/GeoService";
import styles from "../styles/Home.module.css";
import React from "react";
const Home: NextPage = () => {
  const [data, dataSet] = useState<any>({
    ip_address: "",
    connection: {
      isp_name: "",
    },
    timezone: {
      name: "",
    },
  });

  const [dataTop, setDataTop] = useState<any>([]);

  const fetchMyAPI = useCallback(async () => {
    var res = await GeoService.getGeoInfo();
    dataSet(res);
    GeoService.topGeoVisitor().then((response) => {
      setDataTop(response);
    });
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>You remote IP is : {data.ip_address}</p>
        <hr />
        <p className="mb-0">
          ISP Name: {data.connection ? data.connection.isp_name : ""}
        </p>
        <p className="mb-0">City : {data.city}</p>
        <p className="mb-0">Country : {data.country}</p>
        <p className="mb-0">
          Timezone : {data.timezone ? data.timezone.name : ""} abbreviation{" "}
          {data.timezone ? data.timezone.abbreviation : ""}
        </p>
      </Alert>
      <h1>Top Visitor</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>IP Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Visit Count</th>
            <th>ISP</th>
          </tr>
        </thead>
        <tbody>
            {dataTop.map((data: { ip_address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; city: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; country: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; count: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; connection: { isp_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }, i: number) => {
              console.log(data);
              // Return the element. Also pass key
              return (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td>{i+1}</td>
                  <td>{data.ip_address}</td>
                  <td>{data.city}</td>
                  <td>{data.country}</td>
                  <td>{data.count}</td>
                  <td> {data.connection ? data.connection.isp_name : ""}</td>
                </tr>
              );
            })}
        
        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(Home);
