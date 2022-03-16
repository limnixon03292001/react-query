import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import {QueryClientProvider, QueryClient} from "react-query"
import {ReactQueryDevtools} from "react-query/devtools";
import RQSuperHeroPage from './components/RQSuperHero.page'
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelQueriesPage } from './components/DynamicParallelQueries.page'
import { DependedQueriesPage } from './components/DependedQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueryPage } from './components/InfiniteQuery.page'
import { MutationPage } from './components/Mutation.page'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/super-heroes'>Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/rq-mutation'>
            <MutationPage />
          </Route>
          <Route path='/rq-infinite-query'>
            <InfiniteQueryPage/>
          </Route>
          <Route path='/rq-paginated-query'>
            <PaginatedQueriesPage/>
          </Route>
          <Route path='/rq-dependent-query'>
            <DependedQueriesPage email="nixonlim@example.com"/>
          </Route>
          <Route path='/rq-dynamic-parallel'>
            <DynamicParallelQueriesPage heroIds={[1, 3]}/>
          </Route>
          <Route path='/rq-parallel'>
            <ParallelQueriesPage/>
          </Route>
          <Route path='/rq-super-hero/:heroId'>
            <RQSuperHeroPage/>
          </Route>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}

export default App
