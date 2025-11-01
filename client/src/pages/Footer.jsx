
const Footer = ()=>{
    return (
        <footer
            style={{
            textAlign: "center",
            backgroundColor: "#1f2937",
            padding: "20px ",
            borderTop: "1px solid #222",
            width: "100%",
           
            }}
      >
            <p style={{ color:"#f8f2f2", }}>© {new Date().getFullYear()} Venky. All rights reserved.</p>
        </footer>
    )
}
export default Footer
