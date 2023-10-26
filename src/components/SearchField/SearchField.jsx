import "./search-field.css"
import { useSearchParams } from "react-router-dom";
import {useSelector} from "react-redux";

function SearchField({name}) {
    const filteredConversations = useSelector(state => state.conversationData.currentConversationList);
    const onSearchFieldChange = (event) => {
        // filteredConversations.filter(c => c.)
        console.log(filteredConversations)
        console.log(event.target.value)
    }


    // const [searchParams, setSearchParams] = useSearchParams(null);
    // const username = searchParams.get("username");
    return <>
        <form className="search_form">
            <input placeholder='Search' name={name} onChange={onSearchFieldChange}/>
        </form>
    </>
}

export default SearchField;