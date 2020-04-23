import Transformer from '../../../../app/http/mapper/Transformer';
import SampleEntity from '../../domain/entities/SampleEntity';

class SampleTransformer implements Transformer<SampleEntity> {
    transform(data: SampleEntity): object {
        return {
            full_name: `${data.first_name} ${data.last_name}`,
        };
    }
}

export default SampleTransformer;
