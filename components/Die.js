export default function Die(props){
    const styles={
        backgroundColor: props.isFrozen ? "#59E391" : "#fff"
    }
    return(
        <div onClick={props.freeze} className="die" style={styles} ><h2>{props.value}</h2></div>
    )
}