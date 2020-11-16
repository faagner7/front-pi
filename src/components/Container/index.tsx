import classes from './styles.module.css';

const Container: React.FC = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
