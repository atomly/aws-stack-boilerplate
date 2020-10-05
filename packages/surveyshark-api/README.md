# `@atomly/surveyshark`

> TODO: description

## TODOs

- [x] Finish delete resolvers. The respective vertices and edges of the deleted documents should be deleted.
- [x] Finish update resolvers. Use `findOneAndUpdate` and also mix the input argument with the found document.
- [x] Implement graph edge mutation resolver to connect graph vertices.
- [x] Implement validate resolver for the survey graphs.
- [x] Implement result query resolvers.
- [ ] Implement QR codes generator lambda function to fetch survey submission pages.
- [ ] Implement export results lambda function.
- [ ] Implement payments with Stripe API.

## Non-MVP TODOs

- [ ] Add transactions to all create mutation resolvers.
- [ ] Use graph edges weight to measure how many times users go through certain parts of the graph.
