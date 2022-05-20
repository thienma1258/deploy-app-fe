import axios from "axios";
const API_URL = "https://dongpham-challenge.herokuapp.com"

class GeoService {

  async getGeoInfo() {
    let result = await axios({
      method: "get",
      url: API_URL+"/geo/info",
    }).then((data: { data: any; }) => {
        return data.data;
    })
    .catch((error: any) => {
      console.log(error)
    });
    return result.data;
  }

  async topGeoVisitor() {
    let result = await axios({
      method: "get",
      url: API_URL+"/geo/top",
    }).then((data: { data: any; }) => {
        return data.data;
    })
    .catch((error: any) => {
      console.log(error)
    });
    return result.data;
  }

  async recordVisit() {
    let result = await axios({
      method: "get",
      url: API_URL+"/geo/visit",
    }).then((data: { data: any; }) => {
        return data;
    })
    .catch((error: any) => {
      console.log(error)
    });
    return result;
  }


}

export default new GeoService();