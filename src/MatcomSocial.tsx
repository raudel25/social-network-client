import { UserProvider } from "./context/UserProvider";
import TravelAgencyRouter from "./routes/MatcomSocialRouter";
import { MyThemeThemeProvider } from "./context/MyThemeProvider";
import "./styles/styles.scss";

const MatcomSocial = () => {
  return (
    <UserProvider>
      <MyThemeThemeProvider>
        <TravelAgencyRouter />
      </MyThemeThemeProvider>
    </UserProvider>
  );
};

export default MatcomSocial;
