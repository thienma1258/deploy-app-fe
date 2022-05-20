import axios from "axios";
const API_URL = "https://dongpham-challenge.herokuapp.com"

class GameService {

  async topGaming() {
    let result = await axios({
      method: "get",
      url: API_URL+"/game/top",
    }).then((data: { data: any; }) => {
        return data.data;
    })
    .catch((error: any) => {
      console.log(error)
    });
    return result.data;
  }

  async play(username:string) {
    let result = await axios({
      method: "get",
      url: API_URL+"/game/play?username="+username,
    }).then((data: { data: any; }) => {
        return data.data;
    })
    .catch((error: any) => {
      console.log(error)
    });
    return result.data;
  }


}

export default new GameService();