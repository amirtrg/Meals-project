import mealImg from "./../../assets/meal1.jpg";
import HeaderCartButton from "./HeaderCartButton";
import ChevronRight from "../../assets/ChevronRight";
import Button from "./../UI/Button";
import HeaderDivider from "./../../assets/HeaderDivider";
import classes from "./Header.module.css";

const Header = (props) => {
  const onOrder = () => {
    if (window.innerWidth < 800) {
      window.scrollTo(0, 580);
    }
    if (window.innerWidth < 600) {
      window.scrollTo(0, 700);
    }
    if (window.innerWidth < 400) {
      window.scrollTo(0, 550);
    } else {
      window.scrollTo(0, 640);
    }
  };
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.brand}>meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={classes.banner}>
        <span className={classes.bannerItems}>
          <h1>order what you truly deserve</h1>
          <Button
            onClick={onOrder}
            className={classes.button}
            variant="outline"
          >
            order now
            <span className={classes.icon}>
              <ChevronRight />
            </span>
          </Button>
        </span>
        <img src={mealImg} alt={mealImg} />
        <HeaderDivider />
      </div>
    </>
  );
};

export default Header;
