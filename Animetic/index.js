import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/vkui.css";

const Banner = () => {
    const [bannerData, setBannerData] = useState({});
  
    useEffect(() => {
      bridge.send("VKWebAppGetAds").then((bannerInfo) => {
        setBannerData(bannerInfo);
      });
    }, []);
  
    if (!bannerData) {
      return null;
    }
  
    return <PromoBanner bannerData={bannerData} />;
  }

const domContainer = document.querySelector('#baner');
ReactDOM.render(Banner, domContainer);


ReactDOM.render(Banner, document.getElementById('baner').innerHTML);