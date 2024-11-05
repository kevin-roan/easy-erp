import axios from "axios";

interface Props {
  email: string;
  name: string;
}

const createNewProfile = ({ email, name }: Props) => {
  axios.post("http://192.168.0.198:8000/user");
};

export { createNewProfile };
