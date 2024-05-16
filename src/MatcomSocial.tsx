import { UserProvider } from "./context/UserProvider";
import TravelAgencyRouter from "./routes/MatcomSocialRouter";

const MatcomSocial = () => {
  return (
    <UserProvider>
      <TravelAgencyRouter />
    </UserProvider>
  );
};

export default MatcomSocial;
