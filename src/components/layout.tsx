/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"

const Layout:React.FC<React.ReactNode> = ({ children }) => {
  return (
    <>
      <Header siteTitle={'Todo App using GraphQl and Faunadb'} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main style={{minHeight:"70vh"}}>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://egghead.io/courses/building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb">GraphQl and Faunadb</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
