import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { AppDispatch, AppState } from "../store"
import type { ChangeEvent } from 'react'
import { setSelectedTopicId, setSortType } from "../store/feed/actions"
import { SortType } from "../store/feed/types"

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    selectedTopicId, 
    sortType, 
    topics
  } = useSelector((state: AppState) => {
    return state.feed
  })

  const onTopicChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value
    dispatch(setSelectedTopicId(value))
  }

  const onSortTypeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value
    dispatch(setSortType(value as SortType))
  }

  return (
    <Container>
      <h3>Select by: </h3>
      <Group>
        <p>Topic: </p>
        <select
          onChange={onTopicChange}
          value={selectedTopicId}
        >
          <option value="">All</option>
          {topics.map((topic, idx) => {
            return (
              <option key={idx} value={topic.id}>
                {topic.name}
              </option>
            )
          })}
        </select>
      </Group>
      <Group>
        <p>Order: </p>
        <select 
          onChange={onSortTypeChange} 
          value={sortType}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
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