import styled from "styled-components"

const Filters = () => {
  return (
    <Container>
      <h3>Select by: </h3>
      <Group>
        <p>Topic: </p>
        <select>
          <option>All</option>
          <option>Mine</option>
          <option>Music</option>
          <option>Games</option>
          <option>Sports</option>
        </select>
      </Group>
      <Group>
        <p>Order: </p>
        <select>
          <option>Newest</option>
          <option>Oldest</option>
          <option>Popularity</option>
        </select>
      </Group>
    </Container>
  )
}

const Group = styled.span`
  display: flex;
  align-items: center;
  box-shadow: var(--grey) 0px 0px 3px;
  padding: 0.5em 0.75em;
  & > * + * {
    margin-left: 0.75em;
  }
`

const Container = styled.div`
  padding: 1em 2em;
  display: flex;
  align-items: center;
  box-shadow: var(--grey) 0px 1px 3px;
  & > * + * {
    margin-left: 1em;
  }
`

export default Filters