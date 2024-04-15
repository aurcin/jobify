const paths = {
  home: () => '/',
  addJob: () => '/add-job',
  jobs: () => '/jobs',
  jobById: (id: string) => `/jobs/${id}`,
  stats: () => '/stats',
};

export default paths;
