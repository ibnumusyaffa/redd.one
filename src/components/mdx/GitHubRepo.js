import React from 'react'
import styled from 'styled-components'
import { Box, Composition } from 'atomic-layout'
import { GoRepo } from 'react-icons/go'

import Text from '../Text'

const StyledContainer = styled.div`
  background-color: #f6f8fa;
  // border: 1px solid #d1d5da;
  border-radius: 4px;
`

const GitHubRepo = ({ owner, repo }) => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then(res => res.json())
      .then(setData)
  }, [owner, repo])

  return (
    <Composition
      as={StyledContainer}
      areas="icon content"
      templateCols="48px 1fr"
      gutter={16}
      alignItems="center"
      marginVertical={32}
      padding={24}
    >
      {({ Icon, Content }) => (
        <>
          <Icon as={GoRepo} size={48} align="start" />
          <Content marginTop={-8}>
            {data ? (
              <>
                <Box
                  as="a"
                  marginBottom={4}
                  href={data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.name}
                </Box>
                <Text as="p" small>
                  {data.description}
                </Text>
              </>
            ) : (
                <Text small>Communicating to the octocat...</Text>
              )}
          </Content>
        </>
      )}
    </Composition>
  )
}

export default GitHubRepo
