# `@atomly/surveyshark`

> TODO: description

## TODOs

- [x] Finish delete resolvers. The respective vertices and edges of the deleted documents should be deleted.
- [x] Finish update resolvers. Use `findOneAndUpdate` and also mix the input argument with the found document.
- [x] Implement graph edge mutation resolver to connect graph vertices.
- [ ] Implement validate resolver for the survey graphs.
- [ ] Implement result query resolvers.
- [ ] Implement submit results lambda function.
- [ ] Implement export results lambda function.
- [ ] Implement payments with Stripe API.
- [ ] Implement QR codes generator lambda function to fetch survey submission pages.
- [ ] Add transactions to all create mutation resolvers.
- [ ] Use graph edges weight to measure how many times users go through certain parts of the graph.
