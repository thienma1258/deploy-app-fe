import axios from "axios";
const API_URL = "https://dongpham-challenge.herokuapp.com"

class QuoteService {

  async top() {
    let result = await axios({
      method: "get",
      url: API_URL + "/quote",
    }).then((data: { data: any; }) => {
      return data.data;
    })
      .catch((error: any) => {
        console.log(error)
      });
    return result.data;
  }


  async react(username:string,key: string, isLike?: boolean, isUnlike?: boolean) {
    let result = await axios({
      method: "put",
      url: API_URL + "/quote/react?username="+username,
      data: {
        key: key,
        isLike: isLike,
        isUnlike: isUnlike,
      }

    }).then((data: { data: any; }) => {
      return data;
    })
      .catch((error: any) => {
        console.log(error)
      });
    return result;
  }


}

export default new QuoteService();