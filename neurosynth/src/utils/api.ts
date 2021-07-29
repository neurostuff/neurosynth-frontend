import {
    AnalysesApiFactory,
    ConditionsApiFactory,
    Configuration,
    DatasetsApiFactory,
    ImagesApiFactory,
    PointsApiFactory,
    StudiesApiFactory,
    UserApiFactory,
} from '../gen/api';

const API = (token: string = '') => {
    const config: Configuration = new Configuration({
        basePath: 'https://neurostore.org/api',
        baseOptions: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const StudiesService = StudiesApiFactory(config, undefined, undefined);
    const AnalysesService = AnalysesApiFactory(config, undefined, undefined);
    const ConditionsService = ConditionsApiFactory(
        config,
        undefined,
        undefined,
    );
    const DataSetsService = DatasetsApiFactory(config, undefined, undefined);
    const ImagesService = ImagesApiFactory(config, undefined, undefined);
    const PointsService = PointsApiFactory(config, undefined, undefined);
    const UsersService = UserApiFactory(config, undefined, undefined);

    return {
        StudiesService,
        AnalysesService,
        ConditionsService,
        DataSetsService,
        ImagesService,
        PointsService,
        UsersService,
    };
};

export default API;