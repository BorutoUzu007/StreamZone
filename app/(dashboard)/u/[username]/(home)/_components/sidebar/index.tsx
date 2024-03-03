import { Navigation } from "./navigation"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = () => {
    return (
        <div>
            <Wrapper>
                <Toggle />
                <Navigation />
            </Wrapper>
        </div>
    )
}